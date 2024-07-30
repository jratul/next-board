import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.redirect(`/edit/${req.body._id}`);
  }

  const title = req.body.title.trim();
  const content = req.body.content.trim();

  if (!title || !content) {
    return res.redirect(`/edit/${req.body._id}`);
  }

  try {
    const db = (await connectDB).db("forum");
    await db
      .collection("post")
      .updateOne(
        { _id: ObjectId.createFromHexString(req.body._id) },
        { $set: { title, content } }
      );

    return res.redirect("/list");
  } catch (error) {
    return res.redirect(`/edit/${req.body._id}`);
  }
}
