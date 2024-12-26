import mongoose from "mongoose";

const MONGO_URI = process.env.NEXT_PUBLIC_MONGODB_URI as string;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable.");
}

// Extend global object
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts);
  }

  cached.conn = (await cached.promise).connection;
  return cached.conn;
}

export default dbConnect;
