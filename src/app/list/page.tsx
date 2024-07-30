import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function List() {
  const db = (await connectDB).db("forum");
  const docs = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {docs.map((doc) => (
        <div key={doc._id.toString()} className="list-item">
          <Link href={`/detail/${doc._id.toString()}`}>
            <h4>{doc.title}</h4>
          </Link>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  );
}
