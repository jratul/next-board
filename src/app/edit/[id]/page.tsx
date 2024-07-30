import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function Edit({ params }: { params: { id: string } }) {
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("post")
    .findOne({ _id: ObjectId.createFromHexString(params.id) });

  return (
    <div className="p-20">
      <h4>글 작성</h4>
      <form action="/api/edit" method="POST">
        <input
          type="text"
          name="title"
          placeholder="글 제목"
          defaultValue={result?.title || ""}
        />
        <input
          type="text"
          name="content"
          placeholder="글 내용"
          defaultValue={result?.content || ""}
        />
        <input
          style={{ display: "none" }}
          name="_id"
          defaultValue={result?._id?.toString() || ""}
        />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}
