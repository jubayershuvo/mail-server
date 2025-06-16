// models/Uses.ts

import mongoose from "mongoose";

const UsesSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    text: { type: String, required: true },
    attachments: { type: String },
    provider: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Uses || mongoose.model("Uses", UsesSchema);

