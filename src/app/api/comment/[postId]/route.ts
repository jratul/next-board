import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/util/authOptions";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  if (!params.postId) {
    return Response.json({ status: 400 });
  }

  const db = (await connectDB).db("forum");
  const collection = db.collection("comment");

  try {
    const comments = await collection.find({ postId: params.postId }).toArray();

    return Response.json(comments, { status: 200 });
  } catch (error) {
    return Response.json({ status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  if (!params.postId) {
    return Response.json({ status: 400 });
  }

  const db = (await connectDB).db("forum");
  const collection = db.collection("comment");

  // @ts-ignore
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const comment = body?.comment;
  const sessionEmail = session?.user?.email;

  if (!comment || !sessionEmail) {
    return Response.json({ status: 500 });
  }

  try {
    await collection.insertOne({
      comment: comment,
      writer: sessionEmail,
      postId: params.postId,
    });

    return Response.json({ status: 201 });
  } catch (error) {
    return Response.json({ status: 500 });
  }
}
