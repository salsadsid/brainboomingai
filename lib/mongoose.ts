import mongoose from "mongoose";

const MONGO_URI = `mongodb+srv://dbUser:7qWYUkpWgb9Z6Pia@cluster0.nfmyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable.");
}

// Extend global object to include mongoose cache with correct types
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Mongoose> | null;
}

// Add a custom definition for globalThis to avoid TypeScript errors
declare global {
  // Make sure the type matches MongooseCache
  var mongoose: MongooseCache;
}

// Initialize the cached variable or create a new one if it doesn't exist
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
