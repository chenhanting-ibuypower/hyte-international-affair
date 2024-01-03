import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const {
          locale,
          original,
          backLanguage,
          translatedText,
          backLanguageContent,
        } = req.body;

        console.log({
          locale,
          original,
          backLanguage,
          translatedText,
          backLanguageContent,
        });

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

        const client = new MongoClient(process.env.MONGODB_URL as string);

        await client.connect();
        const collection = client.db("localization").collection("translations");

        const instances = req.body.original.map((item: any, index: number) => ({
          original: item,
          translatedText: req.body.translatedText[index],
          backLanguageContent: req.body.backLanguageContent[index],
          backLanguage: req.body.backLanguage,
          to: req.body.locale,
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
