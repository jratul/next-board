"use client";

import Link from "next/link";

import DetailLink from "./DetailLink";
import { useRef } from "react";

interface Props {
  id: string;
  title: string;
  writer: string;
  sessionEmail: string;
}

export default function ListItem({ id, title, writer, sessionEmail }: Props) {
  const listItem = useRef<HTMLDivElement>(null);

  const handleDeleteClick = (e: React.MouseEvent) => {
    fetch("/api/delete", { method: "DELETE", body: id })
      .then((res) => {
        console.log("status: ", res.status);
        if (res.status === 200) {
          return res.json();
        } else {
          // Error Code
        }
      })
      .then(() => {
        if (listItem?.current?.style) {
          listItem.current.style.opacity = "0";
        }

        setTimeout(() => {
          if (listItem?.current?.style) {
            listItem.current.style.display = "none";
          }
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="list-item" ref={listItem}>
      <Link prefetch={false} href={`/detail/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p>1월 1일</p>
      written by {writer}
      <br />
      <DetailLink id={id} />
      {sessionEmail === writer && (
        <>
          <br />
          <Link href={`/edit/${id}`}>수정</Link>
          &nbsp;
          <span
            onClick={handleDeleteClick}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            삭제
          </span>
        </>
      )}
    </div>
  );
}
