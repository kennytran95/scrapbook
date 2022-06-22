const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/scrapbook", { useNewUrlParser: true });

const scrapbookSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now },
  location: String,
  photos: [String],
  song: String,
});

const Scrapbook = mongoose.model("Scrapbook", scrapbookSchema);

const addMemory = (entry) => {
  return Scrapbook.create(entry);
};

const getAllMemories = () => {
  return Scrapbook.find();
};

module.exports.addMemory = addMemory;
module.exports.getAllMemories = getAllMemories;
