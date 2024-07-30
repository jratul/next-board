import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function Detail({ params }: { params: { id: number } }) {
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(params.id) });
  return (
    <div>
      <h1>{result?.title || ""}</h1>
      <p>{result?.content || ""}</p>
    </div>
  );
}
