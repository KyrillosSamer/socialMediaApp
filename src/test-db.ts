import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const testConnection = async () => {
    const uri = process.env.MONGO_URI;
    
    // إضافة خيارات إجبارية لتجاوز مشاكل الاتصال في الشبكات المقيدة
    const options: mongoose.ConnectOptions = {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
    };

    try {
        console.log("Connecting to:", uri);
        await mongoose.connect(uri as string, options);
        console.log("✅ Successfully connected to MongoDB Atlas");
        
        // هنا يمكنك إضافة كود تجربة إنشاء مستخدم
        process.exit(0);
    } catch (error) {
        console.error("❌ Connection failed:", error);
        process.exit(1);
    }
};

testConnection();