const express = require("express");
const router = express.Router();
const axios = require("axios");
const Web3 = require("web3");
const tf = require("@tensorflow/tfjs-node");
const sharp = require("sharp");

const NFT = require("../models/NFT");
const abi = require("../abis/SandPool.json");

const BLOCKCHAIN_HTTP_PROVIDER = process.env.BLOCKCHAIN_HTTP_PROVIDER;
const web3 = new Web3(
  new Web3.providers.HttpProvider(BLOCKCHAIN_HTTP_PROVIDER)
);
const contractABI = abi.abi;
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

const structuredNFTs = (nfts) => {
  return nfts
    .filter((nft) => nft.tokenId != 0)
    .map((nft) => ({
      tokenId: Number(nft.tokenId),
      owner: nft.owner.toLowerCase(),
      cost: web3.utils.fromWei(nft.cost),
      title: nft.title,
      description: nft.description,
      metadataURI: nft.metadataURI,
      timestamp: nft.timestamp,
    }));
};

const modelPrediction = async (image) => {
  const modelFile = "http://localhost:3005/model/model.json";
  const model = await tf.loadLayersModel(modelFile);
  const imgBuffer = await axios
    .get(image, {
      responseType: "arraybuffer",
    })
    .then((res) => Buffer.from(res.data));
  const resizedImage = await sharp(imgBuffer).resize(224, 224).toBuffer();
  const input = tf.node.decodeImage(resizedImage, 3);
  const preprocessedInput = input.expandDims();
  const predictions = model.predict(preprocessedInput);
  const probs = predictions.arraySync()[0];
  const maxProb = Math.max(...probs);
  const predictedClass = probs.indexOf(maxProb);
  return predictedClass;
};

router.get("/fetchNFTsFromBlockchain", async (req, res) => {
  try {
    let nfts = await contract.methods.getAllNFTs().call();
    nfts = structuredNFTs(nfts);

    let newNFTs = [];
    for (let i = 0; i < nfts.length; i++) {
      const nft = await NFT.findOne({ tokenId: nfts[i]["tokenId"] });
      if (!nft) {
        const newNFT = new NFT({
          tokenId: nfts[i]["tokenId"],
          owner: nfts[i]["owner"],
          title: nfts[i]["title"],
          price: nfts[i]["cost"],
          metadataURI: nfts[i]["metadataURI"],
          scanned: false,
          deleted: false,
        });
        const nft = await newNFT.save();
        newNFTs.push(nft);
      } else {
        nft.owner = nfts[i]["owner"];
        nft.price = nfts[i]["cost"];
        await nft.save();
      }
    }
    res.status(200).json(newNFTs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch NFTs from blockchain" });
  }
});

router.get("/NFT/:tokenId", async (req, res) => {
  await axios
    .get("http://localhost:3005/api/fetchNFTsFromBlockchain")
    .then((res) => {})
    .catch((err) => {});
  try {
    const tokenId = req.params.tokenId;
    const nft = await NFT.findOne({ tokenId: tokenId });
    if (nft) res.status(200).json(nft);
    else res.status(404).json({ msg: "NFT not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to get NFT" });
  }
});

router.get("/allNFTs", async (req, res) => {
  await axios
    .get("http://localhost:3005/api/fetchNFTsFromBlockchain")
    .then((res) => {})
    .catch((err) => {});
  try {
    const NFTs = await NFT.find();
    res.status(200).json(NFTs);
  } catch (error) {
    res.status(500).json({ error: "Failed to get NFTs" });
  }
});

router.get("/scanNFTs", async (req, res) => {
  await axios
    .get("http://localhost:3005/api/fetchNFTsFromBlockchain")
    .then((res) => {})
    .catch((err) => {});
  try {
    let is_scanned;
    const nfts = await NFT.find();
    for (let i = 0; i < nfts.length; i++) {
      const nft = await NFT.findOne({ tokenId: nfts[i]["tokenId"] });
      const imageURL = nfts[i]["metadataURI"];
      const scanned = nfts[i]["scanned"];
      if (!scanned) {
        const result = await modelPrediction(imageURL);
        if (result == 1) {
          nft.scanned = true;
          nft.NSFW = true;
          nft.waiting = true;
          await nft.save();
          is_scanned = true;
        } else if (result == 0) {
          nft.scanned = true;
          nft.NSFW = false;
          nft.waiting = false;
          await nft.save();
          is_scanned = true;
        }
      }
    }
    if (is_scanned) res.status(200).json({ msg: "Scanned successfully" });
    else res.status(200).json({ msg: "All NFTs already scanned" });
  } catch (error) {
    res.status(500).json({ error: "Scan failed" });
  }
});

router.get("/updateNotNsfwNFT/:tokenId", async (req, res) => {
  try {
    const tokenId = req.params.tokenId;
    const nft = await NFT.findOne({ tokenId: tokenId });
    nft.waiting = false;
    nft.NSFW = false;
    await nft.save();
    res.status(200).json({ msg: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

router.get("/updateBurnedNFT/:tokenId", async (req, res) => {
  try {
    const tokenId = req.params.tokenId;
    const nft = await NFT.findOne({ tokenId: tokenId });
    nft.waiting = false;
    nft.deleted = true;
    await nft.save();
    res.status(200).json({ msg: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update failed" });
  }
});

router.get("/updateReListingNFT/:tokenId", async (req, res) => {
  try {
    const tokenId = req.params.tokenId;
    const nft = await NFT.findOne({ tokenId: tokenId });
    nft.deleted = false;
    await nft.save();
    res.status(200).json({ msg: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update failed" });
  }
});

router.get("/nsfwNFTsWaiting", async (req, res) => {
  await axios
    .get("http://localhost:3005/api/fetchNFTsFromBlockchain")
    .then((res) => {})
    .catch((err) => {});
  try {
    const nfts = await NFT.find();
    let nsfwNFTs = [];
    for (let i = 0; i < nfts.length; i++) {
      if (nfts[i]["NSFW"] == true && nfts[i]["waiting"] == true) {
        nsfwNFTs.push(nfts[i]);
      }
    }
    res.status(200).json(nsfwNFTs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch NSFW NFTs" });
  }
});

module.exports = router;
