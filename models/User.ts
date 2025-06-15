// models/User.ts

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    photoUrl: { type: String },
    name: { type: String },
    provider: { type: String },
    providerAccountId: { type: String },
    refreshToken: { type: String },
    apiKey: { type: String, sparse: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
