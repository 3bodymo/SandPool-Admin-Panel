import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiSololearn } from "react-icons/si";
import { useStateContext } from "../contexts/ContextProvider";
import { MdAttachMoney } from "react-icons/md";
import { AiFillEyeInvisible, AiOutlinePercentage } from "react-icons/ai";
import { ImEyeBlocked } from "react-icons/im";
import { FiRefreshCw } from "react-icons/fi";
import { HiFire } from "react-icons/hi";

import { BsImage, BsImages } from "react-icons/bs";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-2xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiSololearn /> <span>SandPool</span>
            </Link>
          </div>
          <div className="mt-10 ">
            <div>
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                Dashboard
              </p>

              <NavLink
                to="/statistics"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <MdAttachMoney />
                <span>Statistics</span>
              </NavLink>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                Pages
              </p>

              <NavLink
                to="/nsfw-nfts"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <ImEyeBlocked />
                <span>NSFW NFTs</span>
              </NavLink>

              <NavLink
                to="/burn-nft"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <HiFire />
                <span>Burn NFT</span>
              </NavLink>

              <NavLink
                to="/reListing-nft"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FiRefreshCw />
                <span>Re-listing NFT</span>
              </NavLink>

              <NavLink
                to="/change-market-fee"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <AiOutlinePercentage />
                <span>Change Market Fee</span>
              </NavLink>

              <NavLink
                to="/display-nft"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <BsImage />
                <span>Display an NFT</span>
              </NavLink>

              <NavLink
                to="/all-nfts"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <BsImages />
                <span>Display all NFTs</span>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
