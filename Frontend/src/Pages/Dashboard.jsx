import React from "react";
import { useState, useRef } from "react";
import {
  checkRewardRate,
  checkTotalStakedToken,
  checkBalance,
  checkRewardBalance,
  mint,
  stakeToken,
  withdrawToken,
  claimReward,
} from "../utils/utils";
import { toast } from "sonner";
import Logout from "../Components/Logout";
import {
  BiLogoGmail,
  FaXTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagramSquare,
} from "../Components/Icons";
import { FaInstagram } from "react-icons/fa6";

const Dashboard = ({ wallet, walletConnected, settingWallet }) => {
  const [viewFunc, setViewFunc] = useState({
    rewardR: null,
    totalS: null,
    userB: null,
    rewardB: null,
  });
  const [dataFetched, setDataFetched] = useState(false);
  const [rewardRa, setRewardRa] = useState({ dataFetched: false, data: null });
  const [stakedTo, setStakedTo] = useState({ dataFetched: false, data: null });
  const [userBal, setUserBal] = useState({ dataFetched: false, data: null });
  const [rewardBal, setRewardBal] = useState({
    dataFetched: false,
    data: null,
  });
  const mintVal = useRef(null);
  const sendMintPrice = useRef(null);
  const numberOfStakes = useRef(null);
  const withdrawAmt = useRef(null);

  const updateRewardsRate = async () => {
    setRewardRa({ dataFetched: false });
    const val = Number(await checkRewardRate(wallet, walletConnected));
    setRewardRa({ dataFetched: true, data: val });
  };

  const updateTotalStaked = async () => {
    setStakedTo({ dataFetched: false });
    const val = Number(await checkTotalStakedToken(wallet, walletConnected));
    setStakedTo({ dataFetched: true, data: val });
  };

  const updateUserBal = async () => {
    setUserBal({ dataFetched: false });
    const val = Number(await checkBalance(wallet, walletConnected));
    setUserBal({ dataFetched: true, data: val });
  };

  const updateRewardBal = async () => {
    setRewardBal({ dataFetched: false });
    const val = Number(await checkRewardBalance(wallet, walletConnected));
    setRewardBal({ dataFetched: true, data: val });
  };

  const fetchData = async () => {
    setDataFetched(false);
    try {
      const rewardRate = Number(await checkRewardRate(wallet, walletConnected));
      const totalStaked = Number(
        await checkTotalStakedToken(wallet, walletConnected)
      );
      const userBalance = Number(await checkBalance(wallet, walletConnected));
      const rewardBal = Number(
        await checkRewardBalance(wallet, walletConnected)
      );

      setViewFunc({
        rewardR: rewardRate,
        totalS: totalStaked,
        userB: userBalance,
        rewardB: rewardBal,
      });
      setDataFetched(true);
    } catch (error) {
      toast.error(error);
    }
  };

  // useEffect(()=>{
  //   fetchData()
  // },[])

  const mintTokens = async () => {
    event.preventDefault();
    const mValue = mintVal.current.value;
    const mintPrice = sendMintPrice.current.value;
    await mint(wallet, walletConnected, mValue, mintPrice);
  };

  const stakeTokens = async () => {
    event.preventDefault();
    const stakeVal = numberOfStakes.current.value;
    await stakeToken(wallet, walletConnected, stakeVal);
  };

  const withdrawTokens = async () => {
    event.preventDefault();
    const withdrawVal = withdrawAmt.current.value;
    await withdrawToken(wallet, walletConnected, withdrawVal);
  };
   

  const claimRewards = async () => {
    event.preventDefault();
    await claimReward(wallet, walletConnected);
  };
  //const buttonsBg = "dark:bg-gradient-to-t from-[#040921] to-transparent";
  const buttonsBg = "dark:bg-[#4263EB] light-circle";
  const viewButtonProperties = `${buttonsBg} dark:shadow-none hover border-[0.5px] border-slate-300 dark:border-none rounded-3xl h-full w-[25%] flex flex-col items-center justify-center`;

  return (
    <div className="h-screen w-screen flex items-center justify-center p-3 z-20">
      <div className="absolute top-0 left-0">
        <Logout settingWallet={settingWallet} />
      </div>

      <div className=" h-[95%]  w-[70%] flex flex-col gap-10 items-center justify-center ">
        <div
          className={`${buttonsBg} shadow-lg  border-[0.5px] border-slate-300 dark:border-none transition-all duration-500 h-[20%] w-full flex justify-center items-center text-4xl tracking-wider font-bold rounded-3xl`}
        >
          Staking Dapp
        </div>

        <div className="h-[50%] w-full flex flex-col gap-5 items-center rounded-3xl">
          {/* View functions starts here */}
          <div className=" w-full h-[25%] flex items-center justify-center gap-5">
            <button
              onClick={updateTotalStaked}
              className={`${viewButtonProperties}`}
            >
              <div className=" font-semibold">Total Staked Tokens</div>

              <div>{stakedTo.dataFetched ? stakedTo.data : null}</div>
            </button>

            <button
              onClick={updateRewardsRate}
              className={`${viewButtonProperties}`}
            >
              <div className=" font-semibold">Reward Rate</div>

              <div>
                {rewardRa.dataFetched ? `${rewardRa.data}T Per Sec` : null}
              </div>
            </button>

            <button
              onClick={updateUserBal}
              className={`${viewButtonProperties}`}
            >
              <div className=" font-semibold">Balance</div>

              <div>{userBal.dataFetched ? userBal.data : null}</div>
            </button>

            <button
              onClick={updateRewardBal}
              className={`${viewButtonProperties}`}
            >
              <div className=" font-semibold">Rewards Accumilated</div>

              <div>{rewardBal.dataFetched ? rewardBal.data : null}</div>
            </button>
          </div>
          {/* View functions ends here */}

          {/* State Variable functions starts here */}
          <div className="flex items-center gap-5 w-full h-[75%]">
            <div className="h-full w-[50%] flex flex-col items-center gap-5 ">
              <form
                onSubmit={mintTokens}
                className={`${buttonsBg} flex items-start p-2 justify-start dark:shadow-2xl border-[0.5px] border-slate-300 hover:shadow-inner transition duration-500 dark:border-none h-[50%] w-full`}
              >
                <div className="flex h-full w-full flex-col items-start gap-5">
                  <input
                    ref={sendMintPrice}
                    type="number"
                    placeholder="Amount (Wei) To Send"
                    className=" bg-transparent rounded-md text-xl  h-30 outline-none remove-arrow"
                  />
                  <input
                    ref={mintVal}
                    type="number"
                    placeholder="Tokens To Mint"
                    className=" bg-transparent rounded-md text-xl  h-30 outline-none remove-arrow"
                  />
                </div>
                <div className="flex h-full w-full flex-col item-center justify-center gap-2">
                  {/* changed by ris */}
                  <div className=" text-center">
                    10 Wei per Token
                  </div>
                  <button className=" dark:dark-rectangle light-rectangle rounded-xl hover:shadow-inner border-slate-300 px-10 py-2 dark:border-black border-[0.5px] transition-all duration-500 cursor-pointer ">
                    Mint Token
                  </button>
                </div>
              </form>

              <form
                onSubmit={withdrawTokens}
                className={`${buttonsBg} dark:shadow-2xl border-[0.5px] border-slate-300 hover:shadow-inner transition duration-500 dark:border-none h-[50%] w-full flex justify-between items-center p-2 gap-5`}
              >
                <input
                  ref={withdrawAmt}
                  type="number"
                  placeholder="Amount To Withdraw"
                  className=" bg-transparent rounded-md text-xl  h-30 outline-none remove-arrow"
                />
                <button className=" dark:dark-rectangle light-rectangle rounded-xl hover:shadow-inner border-slate-300 px-10 py-2 dark:border-black border-[0.5px] transition-all duration-500 cursor-pointer ">
                  Withdraw Token
                </button>
              </form>
            </div>

            <div className="h-full w-[50%] flex flex-col items-center gap-5">
              <form
                onSubmit={stakeTokens}
                className={`${buttonsBg} dark:shadow-2xl border-[0.5px] border-slate-300 hover:shadow-inner transition duration-500 dark:border-none h-[50%] w-full flex justify-between items-center p-2 gap-5`}
              >
                <input
                  ref={numberOfStakes}
                  type="number"
                  placeholder="Amount To Stake"
                  className=" bg-transparent rounded-md text-xl  h-30 outline-none remove-arrow"
                />
                <button className=" dark:dark-rectangle light-rectangle rounded-xl hover:shadow-inner border-slate-300 px-10 py-2 dark:border-black border-[0.5px] transition-all duration-500 cursor-pointer ">
                  Stake Token
                </button>
              </form>

              <form
                onSubmit={claimRewards}
                className={`${buttonsBg} dark:shadow-2xl border-[0.5px] border-slate-300 hover:shadow-inner transition duration-500 dark:border-none h-[50%] w-full flex justify-center items-center`}
              >
                <button className=" dark:dark-rectangle light-rectangle rounded-xl hover:shadow-inner border-slate-300 px-10 py-2 dark:border-black border-[0.5px] transition-all duration-500 cursor-pointer ">
                  Claim Rewards
                </button>
              </form>
            </div>
          </div>
          {/* State Variable functions ends here */}
        </div>

        <div
          className={`${buttonsBg} dark:shadow-none border-[0.5px] border-slate-300 dark:border-none h-[20%] w-full flex justify-center items-center rounded-3xl px-6`}
        >
          <div className="text-xl ">Social handles:</div>
          <div className="flex flex-row">
            <a
              href="mailto:rishabhkm.28@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="mx-4 text-2xl text-slate-500 dark:text-slate-300"
            >
              <BiLogoGmail />
            </a>
            <a
              href="https://www.linkedin.com/in/rishabhkm28/"
              target="_blank"
              rel="noreferrer"
              className="mx-4 text-2xl text-slate-500 dark:text-slate-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/krishabhkumar?tab=repositories/"
              target="_blank"
              rel="noreferrer"
              className="mx-4 text-2xl text-slate-500 dark:text-slate-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com/MahatoR28"
              target="_blank"
              rel="noreferrer"
              className="mx-4  text-2xl text-slate-500 dark:text-slate-300"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.instagram.com/iam_reeshabh/"
              target="_blank"
              rel="noreferrer"
              className="mx-4 text-2xl text-slate-500 dark:text-slate-300"
            >
              <FaInstagramSquare />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
