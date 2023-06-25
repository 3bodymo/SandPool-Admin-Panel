import { useState } from "react";
import { Header } from "../components";
import { useGlobalState } from "../store";
import { updateMarketFee } from "../utils/Blockchain.Services";
import changeMarketFeeIcon from "../static/images/change-market-fee-icon.jpeg";
import { toast } from "react-hot-toast";

const ChangeFee = () => {
  const [marketFee, setMarketFee] = useGlobalState("marketFee");
  const [newMarketFee, setNewMarketFee] = useState("");

  const handleInputChange = (event) => {
    setNewMarketFee(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast
      .promise(updateMarketFee(newMarketFee), {
        loading: "Updating market fee...",
        success: "The market fee updated successfully",
        error: "Failed to update",
      })
      .then(() => {
        setMarketFee(newMarketFee);
        setNewMarketFee("");
      });
  };

  return (
    <div className="m-2 md:mx-10 md:my-5 mt-24 p-2 md:p-10 bg-white rounded-3xl border-1 border-cyan-200">
      <Header category="Page" title="Change Market Fee" />
      <>
        <section className="flex flex-col justify-center antialiased text-gray-600 h-auto p-4">
          <div className="h-full">
            <div className="max-w-[360px] mx-auto">
              <div className="bg-white shadow-lg rounded-lg mt-9">
                <header className="text-center px-5 pb-5">
                  <div className="inline-flex -mt-9 w-[72px] h-[72px] fill-current rounded-full border-4 border-white box-content shadow mb-3">
                    <img
                      className="rounded-full"
                      src={changeMarketFeeIcon}
                      alt=""
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Change marketplace fee
                  </h3>
                </header>
                <div className="bg-gray-100 text-center px-5 py-6">
                  <div className="text-sm mb-6">
                    The current fee is
                    <strong className="font-semibold"> {marketFee}%</strong>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex shadow-sm rounded">
                      <div className="flex-grow">
                        <input
                          name="card-nr"
                          value={newMarketFee}
                          onChange={handleInputChange}
                          className="text-sm text-gray-800 bg-white rounded-l leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-indigo-300 focus:ring-0"
                          type="text"
                          placeholder="0 - 100"
                          aria-label="Fee"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="font-semibold text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                    >
                      Update
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

export default ChangeFee;
