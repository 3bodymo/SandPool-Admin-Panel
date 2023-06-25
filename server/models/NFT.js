const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  tokenId: {
    required: true,
    type: Number,
    unique: true,
  },
  owner: {
    required: true,
    type: String,
  },
  price: {
    required: false,
    type: Number,
  },
  title: {
    required: false,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  metadataURI: {
    required: true,
    type: String,
    unique: true,
  },
  scanned: {
    required: false,
    type: Boolean,
  },
  deleted: {
    required: false,
    type: Boolean,
  },
  waiting: {
    required: false,
    type: Boolean,
  },
  NSFW: {
    required: false,
    type: Boolean,
  },
});

module.exports = mongoose.model.NFT || mongoose.model("NFT", nftSchema);
