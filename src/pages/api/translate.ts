import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const client = new MongoClient(
          process.env.COSMOSDB_CONNECTION_STRING as string
        );
        await client.connect();
        const collection = client.db("localization").collection("translations");
        const { page = 1, limit = 10 } = req.query;
        const startIndex = (Number(page) - 1) * Number(limit);
        const endIndex = Number(page) * Number(limit);

        const totalDocuments = await collection.countDocuments();
        const totalPages = Math.ceil(totalDocuments / Number(limit));

        const documents = await collection
          .find({})
          .sort({ _id: -1 })
          .skip(startIndex)
          .limit(Number(limit))
          .toArray();

        res
          .status(200)
          .json({ documents, endIndex, totalPages, totalDocuments });
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }

    case "POST":
      try {
        let {
          locale,
          original,
          backLanguage,
          translatedText,
          backLanguageContent,
        } = req.body;

        if (original.length !== backLanguageContent.length) {
          return res.status(400).json({
            error:
              "The length of 'original' and 'backLanguageContent' arrays must be the same",
          });
        }

        if (translatedText.length !== backLanguageContent.length) {
          return res.status(400).json({
            error:
              "The length of 'translatedText' and 'backLanguageContent' arrays must be the same",
          });
        }

        const client = new MongoClient(
          process.env.COSMOSDB_CONNECTION_STRING as string
        );

        await client.connect();
        const collection = client.db("localization").collection("translations");

        const instances = req.body.original.map((item: any, index: number) => ({
          original: item,
          translatedText: req.body.translatedText[index],
          backLanguageContent: req.body.backLanguageContent[index],
          backLanguage: backLanguage,
          to: locale,
        }));

        console.log(
          "🖊️ The payload scheduled to store in mongodb is:",
          instances
        );

        const result = await collection.insertMany(instances);

        res.status(200).json({
          message: "Documents inserted",
          insertedCount: result.insertedCount,
        });

        return res.status(200).json({});
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
