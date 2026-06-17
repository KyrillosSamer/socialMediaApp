import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

export const connectDB = async () => {
    // قراءة الملف يدوياً للتأكد من المحتوى
    const envPath = path.resolve(process.cwd(), '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log("DEBUG: Reading .env content...");
    console.log(envContent); // سنرى ما الذي يقرأه الكود في الـ Terminal

    // استخراج الرابط يدوياً
    const match = envContent.match(/MONGO_URI=(.*)/);
    const uri = match ? match[1].trim() : process.env.MONGO_URI;

    try {
        if (!uri) {
            throw new Error("MONGO_URI not found in .env file");
        }
        await mongoose.connect(uri);
        console.log("✅ Successfully connected to MongoDB Atlas");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
    }
};