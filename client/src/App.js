import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Footer, Sidebar } from "./components";
import {
  Statistics,
  DisplayNFT,
  NSFWNFTs,
  AllNFTs,
  ReListingNFT,
  ChangeFee,
  BurnNFT,
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { activeMenu } = useStateContext();

  return (
    <div>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div
            className="fixed right-4 bottom-4"
            style={{ zIndex: "1000" }}
          ></div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<Statistics />} />
                <Route path="/statistics" element={<Statistics />} />

                {/* pages  */}
                <Route path="/nsfw-nfts" element={<NSFWNFTs />} />
                <Route path="/display-nft" element={<DisplayNFT />} />
                <Route path="/burn-nft" element={<BurnNFT />} />
                <Route path="/reListing-nft" element={<ReListingNFT />} />
                <Route path="/change-market-fee" element={<ChangeFee />} />
                <Route path="/all-nfts" element={<AllNFTs />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
