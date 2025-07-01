import mongoose, { Schema, Document } from "mongoose";

export interface IArticle extends Document {
  title: string;
  slug: string;
  meta: string;
  content: string;
  media: string[];
}

const ArticleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  meta: { type: String, required: true },
  content: { type: String, required: true },
  media: [{ type: String }],
});

export default mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema);
