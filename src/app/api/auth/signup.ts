import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.redirect("/register");
  }

  const id = req.body.id.replace(/(\s*)/g, "");
  const email = req.body.email.replace(/(\s*)/g, "");
  const password = await bcrypt.hash(
    req.body?.password.replace(/(\s*)/g, ""),
    10
  );

  if (!id || !email || !password || !emailRegex.test(email)) {
    return res.redirect("/list");
  }

  const db = (await connectDB).db("forum");
  const collection = db.collection("user_cred");

  const post = await collection.findOne({ email: email });

  if (post) {
    return res.redirect("/list");
  }

  await db.collection("user_cred").insertOne(req.body);
  res.redirect("/list");
}
