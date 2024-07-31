import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import "./globals.css";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Board",
  description: "Borad by Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar">
          <Link href="/" className="logo">
            Appleforum
          </Link>
          <Link href="/list">List</Link>
          {session ? (
            <>
              Welcome{" "}
              {session.user?.image && (
                <img
                  src={session.user?.image}
                  style={{
                    width: 20,
                    height: "auto",
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                />
              )}
              {session.user?.name}
              <LogoutBtn />
            </>
          ) : (
            <LoginBtn />
          )}
        </div>
        {children}
      </body>
    </html>
  );
}
