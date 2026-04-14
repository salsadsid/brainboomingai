import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGODB_URI;

if (!uri) {
  // During build (no env vars), export a rejected promise instead of throwing
  // at module level. The adapter only awaits this at request time, not at build time.
  clientPromise = Promise.reject(
    new Error("Please define the MONGODB_URI environment variable."),
  );
  // Suppress unhandled-rejection warning when the promise is never awaited (build).
  clientPromise.catch(() => {});
} else if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
