import React, { useState } from "react";
import { Header } from "../components";
import { reListingNFT } from "../utils/Blockchain.Services";
import reListingNftIcon from "../static/images/relisting-nft-icon.jpeg";
import { toast } from "react-hot-toast";

const ReListingNFT = () => {
  const [tokenId, setTokenId] = useState("");

  const handleInputChange = (event) => {
    setTokenId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast
      .promise(reListingNFT(tokenId), {
        loading: "Re-listing NFT...",
        success: "The NFT listed successfully",
        error: "Failed to re-list",
      })
      .then(() => {
        setTokenId("");
      });
  };

  return (
    <div className="m-2 md:mx-10 md:my-5 mt-24 p-2 md:p-10 bg-white rounded-3xl border-1 border-cyan-200">
      <Header category="Page" title="Re-listing NFT" />
      <>
        <section className="flex flex-col justify-center antialiased text-gray-600 h-auto p-4">
          <div className="h-full">
            <div className="max-w-[360px] mx-auto">
              <div className="bg-white shadow-lg rounded-lg mt-9">
                <header className="text-center px-5 pb-5">
                  <div className="inline-flex -mt-9 w-[72px] h-[72px] fill-current rounded-full border-4 border-white box-content shadow mb-3">
                    <img
                      className="rounded-full"
                      src={reListingNftIcon}
                      alt=""
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Re-listing an NFT by token id
                  </h3>
                </header>
                <div className="bg-gray-100 text-center px-5 py-6">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex shadow-sm rounded">
                      <div className="flex-grow">
                        <input
                          name="card-nr"
                          value={tokenId}
                          onChange={handleInputChange}
                          className="text-sm text-gray-800 bg-white rounded-l leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-indigo-300 focus:ring-0"
                          type="text"
                          placeholder="tokenId"
                          aria-label="Fee"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="font-semibold text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};
export default ReListingNFT;
