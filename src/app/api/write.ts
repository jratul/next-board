import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/util/authOptions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.redirect("/write");
  }

  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  const title = req.body.title.trim();
  const content = req.body.content.trim();
  const writer = session?.user?.email;

  if (!title || !content || !writer) {
    return res.redirect("/write");
  }

  try {
    const db = (await connectDB).db("forum");
    await db.collection("post").insertOne({
      title,
      content,
      writer,
    });

    return res.redirect("/list");
  } catch (error) {
    return res.redirect("/write");
  }
}
