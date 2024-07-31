"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LogoutBtn() {
  return (
    <button
      style={{ marginLeft: 10 }}
      onClick={() => {
        signOut();
        redirect("/");
      }}
    >
      로그아웃
    </button>
  );
}
