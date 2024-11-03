import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
const db = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connected to MongoDB" , db.connection.host);        
        }
     catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}