import mongoose from 'mongoose';

export const connectDB = async () => {
    const uri = process.env.MONGO_URI;

    try {
        if (!uri) {
            throw new Error("MONGO_URI not found in environment variables");
        }
        await mongoose.connect(uri);
        console.log("✅ Successfully connected to MongoDB Atlas");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1); // السيرفر مفيش معنى يفضل شغال بدون قاعدة بيانات
    }
};