import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// const db = async () => {
//   mongoose.connection.on("connected", () =>
//     console.log("MongoDB Database Connected")
//   );

//   await mongoose.connect(`${process.env.MONGODB_URL}/authentication_system_db`);
// };

// export default db;


const db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default db;