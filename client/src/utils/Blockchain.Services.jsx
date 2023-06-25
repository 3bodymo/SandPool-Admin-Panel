import Web3 from "web3";
import { setGlobalState, getGlobalState } from "../store/index";
import abi from "../abis/SandPool.json";
import axios from "axios";

const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = abi.networks[networkId];

    if (networkData) {
      const contract = new web3.eth.Contract(abi.abi, networkData.address);
      return contract;
    } else {
      return null;
    }
  } else {
    return getGlobalState("contract");
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask!");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0].toLowerCase());
  } catch (error) {}
};

const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask!");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("chainChanged", async (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
      await isWalletConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
    } else {
      // alert("Please connect your wallet");
      // console.log("No account found!");
    }
  } catch (error) {}
};

const burnNFT = async (tokenId) => {
  try {
    const contract = await getEthereumContract();
    const [account] = await ethereum.request({ method: "eth_accounts" });
    const result = await contract.methods
      .burnNFT(Number(tokenId))
      .send({ from: account });
    if (!result.status) {
      throw new Error("Transaction failed or cancelled");
    }
    await axios
      .get("/api/updateBurnedNFT/" + tokenId)
      .then((res) => {})
      .catch((err) => {});
  } catch (error) {
    console.log(error);
    throw new Error("Transaction failed or cancelled");
  }
};

const reListingNFT = async (tokenId) => {
  try {
    const contract = await getEthereumContract();
    const [account] = await ethereum.request({ method: "eth_accounts" });
    const result = await contract.methods
      .reListBurnedNFT(Number(tokenId))
      .send({ from: account });
    if (!result.status) {
      throw new Error("Transaction failed or cancelled");
    }
    await axios
      .get("/api/updateReListingNFT/" + tokenId)
      .then((response) => {})
      .catch((error) => {});
  } catch (error) {
    console.log(error);
    throw new Error("Transaction failed or cancelled");
  }
};

const updateMarketFee = async (cost) => {
  try {
    const contract = await getEthereumContract();
    const [account] = await ethereum.request({ method: "eth_accounts" });
    const result = await contract.methods
      .changeMarketFee(cost)
      .send({ from: account });
    if (!result.status) {
      throw new Error("Transaction failed or cancelled");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Transaction failed or cancelled");
  }
};

const getCurrentFee = async () => {
  try {
    const contract = await getEthereumContract();
    const marketFee = await contract.methods.getMarketFee().call();
    setGlobalState("marketFee", marketFee);
  } catch (error) {
    console.log(error);
  }
};

export {
  connectWallet,
  isWalletConnected,
  burnNFT,
  getCurrentFee,
  updateMarketFee,
  reListingNFT,
};
