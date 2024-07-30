import { MongoClient } from "mongodb";

const mongoURI =
  "mongodb+srv://jratul3:dkagh1234.@cluster0.9agunol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = new MongoClient(mongoURI).connect();

export { connectDB };
