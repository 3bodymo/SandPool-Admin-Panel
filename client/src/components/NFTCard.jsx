import React from "react";
import iconEthereum from "../static/images/NFTCard/icon-ethereum.svg";
import { burnNFT, reListingNFT } from "../utils/Blockchain.Services";
import { toast } from "react-hot-toast";

const NFTCard = ({ nft }) => {
  const burnNFTHandler = async () => {
    toast
      .promise(burnNFT(nft.tokenId), {
        loading: "Burning NFT...",
        success: "The NFT burned successfully",
        error: "Failed to burn",
      })
      .then(() => {
        window.location.reload();
      });
  };

  const reListNFTHandler = async () => {
    toast
      .promise(reListingNFT(nft.tokenId), {
        loading: "Re-listing NFT...",
        success: "The NFT listed successfully",
        error: "Failed to re-list",
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <section className="main-card bg-cyan-900">
      <div className="image-container h-[285px] w-[285px]">
        <a href={nft.metadataURI} target="_blank">
          <img
            src={nft.metadataURI}
            alt={nft.title}
            className="main-image h-full w-full object-cover object-left-top border-2 border-cyan-500"
          />
        </a>
      </div>
      <div className="text-container">
        <h1 className="title">{nft.title}</h1>
        <div className="eth-info">
          <div className="info">
            <img src={iconEthereum} alt="ETH" className="icon" />
            <span className="eth">{nft.price} ETH</span>
          </div>
        </div>
        <div className="creator-info">
          {nft.deleted ? (
            <button
              onClick={reListNFTHandler}
              className="text-white font-mono text-lg font-bold bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:ring-cyan-300 rounded-lg px-5 py-2.5 mr-2 mt-2 w-full ml-2 focus:outline-none"
            >
              ReListing
            </button>
          ) : (
            <button
              onClick={burnNFTHandler}
              className="text-white font-mono text-lg font-bold bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:ring-cyan-300 rounded-lg px-5 py-2.5 mr-2 mt-2 w-full ml-2 focus:outline-none"
            >
              Burn
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default NFTCard;
