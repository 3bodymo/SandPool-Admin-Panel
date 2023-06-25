import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Header } from "../components";
import { truncateAddress } from "../store";
import { burnNFT, reListingNFT } from "../utils/Blockchain.Services";

const AllNFTs = () => {
  const [nfts, setNfts] = useState([]);

  const updateUI = async () => {
    await axios
      .get("/api/allNFTs")
      .then((response) => {
        setNfts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(async () => {
    await updateUI();
  }, []);

  const burnNFTHandler = async (tokenId) => {
    toast
      .promise(burnNFT(tokenId), {
        loading: "Burning NFT...",
        success: "The NFT burned successfully",
        error: "Failed to burn",
      })
      .then(() => {
        updateUI();
      });
  };

  const reListNFTHandler = async (tokenId) => {
    toast
      .promise(reListingNFT(tokenId), {
        loading: "Re-listing NFT...",
        success: "The NFT listed successfully",
        error: "Failed to re-list",
      })
      .then(() => {
        updateUI();
      });
  };

  return (
    <div className="m-2 md:mx-10 md:my-5 mt-24 p-2 md:p-10 bg-white rounded-3xl border-1 border-cyan-200">
      <Header category="Page" title="Display All NFTs" />
      <div className="container mx-auto px-4 sm:px-8">
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-cyan-200 bg-cyan-100 text-left text-base font-bold text-gray-600 tracking-wider">
                      NFT
                    </th>
                    <th className="px-4 py-3 border-b-2 border-cyan-200 bg-cyan-100 text-left text-base font-bold text-gray-600 tracking-wider">
                      Price
                    </th>
                    <th className="px-5 pl-7 py-3 border-b-2 border-cyan-200 bg-cyan-100 text-left text-base font-bold text-gray-600 tracking-wider">
                      Owner
                    </th>
                    <th className="px-5 pl-10 py-3 border-b-2 border-cyan-200 bg-cyan-100 text-left text-base font-bold text-gray-600 tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 border-b-2 border-cyan-200 bg-cyan-100 text-left text-base font-bold text-gray-600 tracking-wider">
                      Re-list
                    </th>
                    <th className="px-5 py-3 border-b-2 border-cyan-200 bg-cyan-100 text-left text-base font-bold text-gray-600 tracking-wider">
                      Burn
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nfts.map((nft) => (
                    <tr key={nft.tokenId}>
                      <td className="pr-1 pl-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-20 h-20">
                            <a href={nft.metadataURI} target="_blank">
                              <img
                                className="w-full h-full object-cover object-left-top rounded-lg"
                                src={nft.metadataURI}
                                alt={nft.title}
                              />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap font-medium w-40">
                              {nft.title} #{nft.tokenId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {nft.price} ETH
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium">
                        <p className="text-gray-900 whitespace-no-wrap underline">
                          <a
                            className="transititext-primary text-primary font-mono transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                            data-te-toggle="tooltip"
                            title={nft.owner}
                          >
                            {truncateAddress(nft.owner, 4, 4, 11)}
                          </a>
                        </p>
                      </td>
                      {nft.NSFW ? (
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm pl-9">
                          <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">NSFW</span>
                          </span>
                        </td>
                      ) : !nft.scanned ? (
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">WAIT_SCAN</span>
                          </span>
                        </td>
                      ) : (
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">NOT_NSFW</span>
                          </span>
                        </td>
                      )}
                      <td className="px-7 py-5 border-b border-gray-200 bg-white text-sm font-medium">
                        {nft.deleted ? (
                          <button onClick={() => reListNFTHandler(nft.tokenId)}>
                            <CheckCircleIcon className="h-5 w-5"></CheckCircleIcon>
                          </button>
                        ) : null}
                      </td>
                      <td className="px-7 py-5 border-b border-gray-200 bg-white text-sm font-medium">
                        {!nft.deleted ? (
                          <button onClick={() => burnNFTHandler(nft.tokenId)}>
                            <XCircleIcon className="h-5 w-5"></XCircleIcon>
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNFTs;
