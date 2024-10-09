import mongoose from "mongoose";

let isConnected = false;

const connectDb = async (req, res) => {
  mongoose.set("strictQuery", true);
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });

    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
