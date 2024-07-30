import { connectDB } from "@/util/database";
import Link from "next/link";

import ListItem from "./ListItem";

export default async function List() {
  const db = (await connectDB).db("forum");
  const docs = await db.collection("post").find().sort({ _id: -1 }).toArray();

  return (
    <div className="list-bg">
      <Link href="write">글쓰기</Link>
      {docs.map((doc) => (
        <ListItem
          key={doc._id.toString()}
          id={doc._id.toString()}
          title={doc.title}
        />
      ))}
    </div>
  );
}
