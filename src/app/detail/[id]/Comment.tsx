"use client";

import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";

interface Props {
  postId: string;
}

interface CommentItem {
  comment: string;
  writer: string;
  _id: ObjectId;
}

export default function Comment({ postId }: Props) {
  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] = useState<CommentItem[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSendComment = () => {
    if (!postId) {
      return;
    }

    fetch(`/api/comment/${postId}`, {
      method: "POST",
      body: JSON.stringify({ comment: comment }),
    })
      .then((res) => {
        if (res.ok) {
          getComments();
        }
      })
      .catch((error) => {
        alert(`Failed to add comment : ${error}`);
      });
  };

  const getComments = () => {
    if (!postId) {
      return;
    }

    fetch(`/api/comment/${postId}`, { method: "GET" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status}`);
        }

        return res.json();
      })
      .then((comments) => {
        setCommentList(comments);
      })
      .catch((error) => {
        alert(`${error}`);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <div className="comment-bg">
        {commentList.map((item) => (
          <div className="comment-item" key={item._id.toString()}>
            <p>{item.comment}</p>
            <p className="comment-writer">{item.writer}</p>
          </div>
        ))}
      </div>
      <input type="text" onChange={handleInputChange} />
      <button onClick={handleSendComment}>댓글 작성</button>
    </div>
  );
}
