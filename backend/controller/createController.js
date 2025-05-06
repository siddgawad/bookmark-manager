import Bookmark from "../models/bookMarkModel.js";

const createController = async function (req, res) {
  const { title, url, category, collection, tags } = req.body;
  if (!title || !url || !category || !tags)
    return res.status(400).json({ message: "Enter valid inputs" });

  try {
    const existingBkmrk = await Bookmark.findOne({ url });
    if (existingBkmrk)
      return res.status(409).json({ message: "Bookmark already exists for this URL" });

    const newBkmrk = await Bookmark.create({
      title,
      url,
      category,
      collection,
      tags,
    });

    if (!newBkmrk)
      return res.status(500).json({ message: "Bookmark creation failed" });

    return res.status(201).json({ message: "Successfully created bookmark" });
  } catch (err) {
    console.error("Bookmark creation error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default createController;
