import mongoose from "mongoose";

const uri = "mongodb+srv://admin123:RP12345678@cluster0.enkeoaz.mongodb.net/sample?retryWrites=true&w=majority";

export async function connectDb() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in the database:", collections.map(col => col.name));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

export default mongoose;
