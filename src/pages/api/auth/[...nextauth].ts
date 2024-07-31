import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/util/database";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Ov23li1bVjHHmOCtzjzi",
      clientSecret: "d5f79180b3c50ead4ff06f07cb8972f64146f3f3",
    }),
  ],
  secret: "board-jwt-secret",
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
