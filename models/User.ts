// models/User.ts

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    provider: { type: String },
    providerAccountId: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
    apiKey: { type: String, sparse: true, unique: true }, // ✅ FIX: add sparse:true
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
