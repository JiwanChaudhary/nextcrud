import mongoose from "mongoose";

const TopicsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topics || mongoose.model("Topics", TopicsSchema);

export default Topic;
