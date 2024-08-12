import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${db.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1); // 1 is failure , 0 is success
    }
}