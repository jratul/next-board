"use client";

import Link from "next/link";
import DetailLink from "./DetailLink";

interface Props {
  id: string;
  title: string;
}

export default function ListItem({ id, title }: Props) {
  return (
    <div className="list-item">
      <Link prefetch={false} href={`/detail/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p>1월 1일</p>
      <DetailLink id={id} />
      <br />
      <Link href={`/edit/${id}`}>수정</Link>
      &nbsp;
      <span
        onClick={(e) => {
          fetch("/api/delete", { method: "DELETE", body: id })
            .then((res) => {
              if (res.status === 200) {
                return res.json();
              } else {
                // Error Code
              }
            })
            .then(() => {
              if (e.currentTarget?.parentElement?.style?.opacity) {
                e.currentTarget.parentElement.style.opacity = "0";
              }
              setTimeout(() => {
                if (e.currentTarget?.parentElement?.style?.display) {
                  e.currentTarget.parentElement.style.display = "none";
                }
              }, 1000);
            })
            .catch((error) => {
              console.error(error);
            });
        }}
        style={{
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        삭제
      </span>
    </div>
  );
}
