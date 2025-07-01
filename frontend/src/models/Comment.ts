import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema(
  {
    articleSlug: String,
    userName: String,
    userEmail: String,
    content: String,
  },
  { timestamps: true }
);

export default models.Comment || mongoose.model("Comment", commentSchema);
