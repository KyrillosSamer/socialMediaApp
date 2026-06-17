import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true }, // Index للبحث السريع
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },
    bio: { type: String, default: "" },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    refreshToken: { type: String, default: null, select: false },
}, { timestamps: true }); // لإنشاء createdAt و updatedAt تلقائياً

export const User = mongoose.model('User', UserSchema);