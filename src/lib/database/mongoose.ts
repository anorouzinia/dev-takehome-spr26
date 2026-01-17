//creating folder for database access to we dont repeat code for every API
//prevents duplicate code, multiple mongodb connections, and cleaner code for api routes


import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable");
    }
    if (cached.conn) {
        return cached.conn;
    }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
