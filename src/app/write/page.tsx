export default function Write() {
  return (
    <div className="p-20">
      <h4>글 작성</h4>
      <form action="/api/write" method="POST">
        <input type="text" name="title" placeholder="글 제목" />
        <input type="text" name="content" placeholder="글 내용" />
        <button type="submit">글쓰기</button>
      </form>
    </div>
  );
}
