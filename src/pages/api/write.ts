import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.redirect("/write");
  }

  const title = req.body.title.trim();
  const content = req.body.content.trim();

  if (!title || !content) {
    return res.redirect("/write");
  }

  try {
    const db = (await connectDB).db("forum");
    await db.collection("post").insertOne({
      title,
      content,
    });

    return res.redirect("/list");
  } catch (error) {
    return res.redirect("/write");
  }
}
