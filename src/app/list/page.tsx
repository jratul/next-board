import { connectDB } from "@/util/database";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]";
import ListItem from "./ListItem";

export const dynamic = "force-dynamic";

export default async function List() {
  const db = (await connectDB).db("forum");
  const docs = await db.collection("post").find().sort({ _id: -1 }).toArray();

  // @ts-ignore
  const session = await getServerSession(authOptions);

  return (
    <div className="list-bg">
      <Link href="write">글쓰기</Link>
      {docs.map((doc) => (
        <ListItem
          key={doc._id.toString()}
          id={doc._id.toString()}
          title={doc.title}
          writer={doc.writer}
          sessionEmail={session?.user?.email ?? ""}
        />
      ))}
    </div>
  );
}
