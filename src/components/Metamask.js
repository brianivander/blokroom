import React from "react";
import { ethers } from "ethers";

export const Metamask = () => {
  const signMetamask = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask is installed!", window.ethereum.isConnected());
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      debugger;
    } else {
      console.log("something is not Metamask");
    }
  };

  return (
    <div>
      <button onClick={() => signMetamask()}>Open Metamask</button>
    </div>
  );
};
