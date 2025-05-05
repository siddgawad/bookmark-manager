import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "All",
      "Development",
      "Design",
      "News",
      "Social Media",
      "Entertainment",
      "Productivity",
      "Shopping"
    ],
    required: true,
  },
  collection: {
    type: String,
    enum: [
      "All Bookmarks",
      "Favorites",
      "Mobile Bookmarks",
      "Recent"
    ],
    default: "All Bookmarks"
  },
  tags: [{
    type: String,
    enum: [
      "Search",
      "Essential",
      "Video",
      "Entertainment",
      "Development",
      "Code",
      "Help",
      "Social",
      "News",
      "Streaming",
      "Productivity",
      "Shopping"
    ]
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, { timestamps: true });

const Bookmark =  mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
