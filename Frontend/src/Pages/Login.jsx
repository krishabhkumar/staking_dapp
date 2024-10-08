import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import abi from "../contract/abi.json";
import { toast } from "sonner";
import stake from "../assets/stake.png";

const Login = ({ settingWallet }) => {
  const contractAdd = process.env.REACT_APP_CONTRACT_ADDRESS;
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      if (window.ethereum.chainId === "0xaa36a7") {
        console.log(ethereum.chainId);
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAdd, abi.abi, signer);
          settingWallet(provider, contract, signer.address, true);
          toast.success("Metamask connected");
          navigate("/Dashboard");
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.error("Please select Sepolia test network");
      }
    } else {
      toast.error("Please install metamask");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center">
      <div className="flex justify-evenly items-center h-[80%] w-screen">
        {/* This is left side */}
        <div className=" h-full w-[50%] p-3 flex items-center justify-center">
          <div className="flex flex-col gap-2 w-[50%]">
            <div>
              <h1 className=" text-[#4263EB] md:text-4xl  ">Staking Dapp</h1>
            </div>
            <div className="bg-yellow md:w-[90%] text-left ">
              <p className="font-extralight">
                A staking DApp is a decentralized application that allows users
                to stake their token. Users stake their tokens to earn rewards,
                contribute to the ecosystem's growth. By staking, users receive
                financial incentives, support innovation, and potentially
                benefit from token appreciation. build complelety using
                <span className="font-bold "> Blockchain Technology</span>.{" "}
              </p>
            </div>
          </div>
        </div>

        {/* This is right side */}
        <div className=" h-full w-[50%] p-3 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-3 p-3 bg-slate-50 dark:bg-black/40  w-[70%] h-full rounded-2xl shadow-2xl dark:ring-1 dark:ring-[#4263EB]">
            <div>
              <img src={stake} alt="Logo" className="w-52 h-52  mb-2" />
            </div>

            <button
              onClick={connectWallet}
              className=" bg-[#4263EB] p-3 rounded-md shadow-2xl shadow-[#4e6dec] text-white transition-all duration-700 hover:shadow-[0_3px_10px_rgb(0.4,0.4,0.4,0.4)] dark:hover:shadow-cyan-500/50 cursor-pointer"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
