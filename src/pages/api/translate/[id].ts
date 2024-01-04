import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { id } = req.query;
        let { quality, suggestion } = req.body;

        if (!quality) {
          return res.status(400).json({
            error: "The quality is required",
          });
        }

        const client = new MongoClient(
          process.env.COSMOSDB_CONNECTION_STRING as string
        );
        const collection = client.db("localization").collection("translations");
        const documents = await collection
          .find({ _id: new ObjectId(id as string) })
          .toArray();

        if (documents.length === 0) {
          return res.status(404).json({ error: "Not found" });
        }

        const { _id } = documents[0];

        const updatePayload = {
          suggestion,
          quality,
        };

        await collection.updateOne(
          { _id },
          {
            $set: {
              ...documents[0],
              ...updatePayload,
            },
          }
        );

        return res
          .status(201)
          .json(
            await collection.find({ _id: new ObjectId(id as string) }).toArray()
          );
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
