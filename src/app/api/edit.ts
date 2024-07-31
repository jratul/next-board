import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.redirect(`/edit/${req.body._id}`);
  }

  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  const id = ObjectId.createFromHexString(req.body._id);
  const title = req.body.title.trim();
  const content = req.body.content.trim();
  const sessionEmail = session?.user?.email;

  if (!id || !title || !content || !sessionEmail) {
    return res.redirect(`/edit/${id}`);
  }

  try {
    const db = (await connectDB).db("forum");
    const collection = db.collection("post");

    const post = await collection.findOne({ _id: id });

    if (post?.writer !== sessionEmail) {
      return res.redirect(`/edit/${req.body._id}`);
    }

    await db
      .collection("post")
      .updateOne({ _id: id }, { $set: { title, content } });

    return res.redirect("/list");
  } catch (error) {
    return res.redirect(`/edit/${req.body._id}`);
  }
}
