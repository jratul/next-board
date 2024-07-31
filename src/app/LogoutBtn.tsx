"use client";

import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <button
      style={{ marginLeft: 10 }}
      onClick={() => {
        signOut();
      }}
    >
      로그아웃
    </button>
  );
}
