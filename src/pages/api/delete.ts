import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.redirect("/list");
  }

  try {
    const db = (await connectDB).db("forum");
    const result = await db.collection("post").deleteOne({
      _id: ObjectId.createFromHexString(req.body),
    });

    return res.status(200).json("delete done");
  } catch (error) {
    return res.redirect("/list");
  }
}
