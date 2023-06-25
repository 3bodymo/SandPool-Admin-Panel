import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { AiOutlineFileImage } from "react-icons/ai";
import { FiBarChart } from "react-icons/fi";

const Statistics = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="mt-16">
      <h1 className="text-center font-bold text-4xl pb-12 font-mono">
        Admin Panel
      </h1>
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-14 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl font-medium">$63,448.78</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              style={{ color: "#03C9D7", backgroundColor: "#E5FAFB" }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
            >
              <MdOutlineSupervisorAccount />
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">39,354</span>
              <span className="text-sm text-green-600 ml-2">+4%</span>
            </p>
            <p className="text-sm text-gray-400  mt-1">Users</p>
          </div>
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              style={{
                color: "rgb(255, 244, 229)",
                backgroundColor: "rgb(254, 201, 15)",
              }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
            >
              <AiOutlineFileImage />
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">4,396</span>
              <span className="text-sm text-green-600 ml-2">+23%</span>
            </p>
            <p className="text-sm text-gray-400  mt-1">NFTs</p>
          </div>
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              style={{
                color: "rgb(228, 106, 118)",
                backgroundColor: "rgb(255, 244, 229)",
              }}
              className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
            >
              <FiBarChart />
            </button>
            <p className="mt-3">
              <span className="text-lg font-semibold">423,39</span>
              <span className="text-sm text-green-600 ml-2">+38%</span>
            </p>
            <p className="text-sm text-gray-400  mt-1">Sales</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
