import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { truncateAddress, useGlobalState } from "../store";
import {
  connectWallet,
  getCurrentFee,
  isWalletConnected,
} from "../utils/Blockchain.Services";

const Navbar = () => {
  const { setActiveMenu, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const [connectedAccount] = useGlobalState("connectedAccount");

  useEffect(async () => {
    await isWalletConnected();
    await getCurrentFee();
  }, []);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      {connectedAccount ? (
        <button className="py-2.5 px-5 mx-2 mt-2 text-sm font-mono font-medium focus:outline-none bg-white rounded-full border border-cyan-200 text-cyan-500 cursor-default">
          {truncateAddress(connectedAccount, 4, 4, 11)}{" "}
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className="py-2.5 px-5 mx-2 mt-2 text-sm font-mono font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:border-cyan-200 hover:text-cyan-500 focus:z-10 focus:ring-4 focus:ring-gray-200"
        >
          Connect wallet
        </button>
      )}
    </div>
  );
};

export default Navbar;
