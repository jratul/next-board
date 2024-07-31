import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.redirect("/list");
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.redirect("/list");
  }

  try {
    const db = (await connectDB).db("forum");

    const post = await db.collection("post").findOne({
      _id: ObjectId.createFromHexString(req.body),
    });

    console.log("post.writer : ", post?.writer);
    console.log("session email : ", session?.user?.email);

    if (post?.writer !== session?.user?.email) {
      return res.redirect("/list");
    }

    const result = await db.collection("post").deleteOne({
      _id: ObjectId.createFromHexString(req.body),
    });

    return res.status(200).json("delete done");
  } catch (error) {
    return res.redirect("/list");
  }
}
