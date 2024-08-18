import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ethers } from "ethers";
// import Abi from "../contracts/Abi.json";
import { toast } from "sonner";

const contractAdd = "";

const Login = ({  }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const navigate = useNavigate();

  const connectWallet = async () => {

    // if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    //   if (window.ethereum.chainId === "0xaa36a7") {
    //     try {
    //       const provider = new ethers.BrowserProvider(window.ethereum);
    //       await provider.send("eth_requestAccounts", []);
    //       const signer = await provider.getSigner();
    //       const contract = new ethers.Contract(contractAdd, Abi.abi, signer);
    //       toast.success("Metamask connected");
    //       setWalletConnected(true);
    //       wallet(provider, contract, signer.address);
          navigate("/Dashboard"); 
    //     } catch (error) {
    //       toast.error(error.message);
    //     }
    //   } else {
    //     toast.error("Please select Sepolia test network");
    //   }
    // } else {
    //   toast.error("Please install metamask");
    // }
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
                            A staking DApp is a decentralized application that allows
                            users to stake their token. Users stake their tokens to earn rewards, 
                            contribute to the ecosystem's growth. By staking, users receive financial
                            incentives, support innovation, and potentially benefit from token appreciation.{" "}
                            build complelety using
                            <span className="font-bold "> Blockchain Technology</span>.{" "}
                        </p>
                    </div>
                </div>
            </div>

            {/* This is right side */}
            <div className=" h-full w-[50%] p-3 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-3 p-3 bg-slate-50 dark:bg-black/40  w-[70%] h-full rounded-2xl shadow-2xl  ">
                    
                    <div>
                        Logo
                    </div>

                    <button onClick={connectWallet} className=" bg-[#4263EB] p-3 rounded-md shadow-2xl shadow-[#4e6dec] text-white transition-all duration-700 hover:shadow-[0_3px_10px_rgb(0.4,0.4,0.4,0.4)] dark:hover:shadow-cyan-500/50 cursor-pointer">
                        Connect Wallet
                    </button>
                </div>
            </div>
            
        </div>
    </div>
  );
};

export default Login;


// <div className="flex h-[90%]  ">
//   <div className="invisible md:visible w-[50%] bg-slate-50 h-[90%] flex flex-col justify-center items-center flex-wrap dark:bg-slate-800 ">

    // <div className="grid grid-rows-2 grid-flow-col w-[50%] ">
    //   <div>
    //     <h1 className=" text-[#4263EB] md:text-4xl  ">Voting Dapp</h1>
    //   </div>
    //   <div className="bg-yellow md:w-[90%] text-left ">
    //     <p className="font-extralight dark:text-white">
    //       A deccentralized Polling system for electing candidates in the
    //       election, build complelety using{" "}
    //       <span className="font-bold ">Blockchain Technology</span>.{" "}
    //     </p>
    //   </div>
    // </div>

//   </div>

//   <div className="w-[100%] h-[100%] -mt-10 md:mt-0 md:w-[48%] md:h-[90%] bg-slate-50 flex justify-center items-center  absolute md:relative dark:bg-slate-800  ">
    
//     <div className="bg-white w-[90%] h-[80%] md:p-10 md:w-[70%] md:h-[95%] flex flex-col justify-center items-center space-y-20  rounded-xl dark:bg-slate-900 shadow-2xl  dark:shadow-cyan-500/50  ">
//       <div>
//         <img
//           className="h-[95%] md:h-[100%] mr-1 md:mr-0"
//           src="https://voting-dapp.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fsvg%2Flogo.b954829cff7fddca2bb11cc74a1876a5.svg&w=384&q=75"
//           alt=""
//         ></img>
//         <h1 className=" text-[#4263EB] font-bold md:text-3xl text-2xl">
//           Votechain
//         </h1>
//       </div>

//       <div>
//         {walletConnected ? 
//         (
//           <button className=" bg-[#4263EB] p-3 text-xl md:text-base  rounded-md text-white hover:bg-[#4e6dec] shadow-2xl shadow-[#4e6dec]  transition-all duration-700 hover:shadow-[0_3px_10px_rgb(0.4,0.4,0.4,0.4)] dark:hover:shadow-cyan-500/50">
//             Connected to Wallet
//           </button>
//         ) : (
//           <button
//             className=" bg-[#4263EB] p-3 text-xl md:text-base  rounded-md text-white hover:bg-[#4e6dec] shadow-2xl shadow-[#4e6dec] transition-all duration-700 hover:shadow-[0_3px_10px_rgb(0.4,0.4,0.4,0.4)] dark:hover:shadow-cyan-500/50"
//             onClick={connectWallet}
//           >
//             Connect Wallet
//           </button>
//         )}

//       </div>
//     </div>
//   </div>

// </div> 