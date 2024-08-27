import React from 'react'
import {useState,useEffect} from "react"
import {checkRewardRate,checkTotalStakedToken,checkBalance,checkRewardBalance} from "../utils/utils"

const Dashboard = ({wallet,walletConnected}) => {

  const [viewFunc,setViewFunc] = useState({rewardR:null,totalS:null,userB:null,rewardB:null})
  const [dataFetched,setDataFetched] = useState(false)

 useEffect(()=>{
  
    const fetchData = async () => {
      try{

        const rewardRate = Number(await checkRewardRate(wallet,walletConnected))
        const totalStaked = Number(await checkTotalStakedToken(wallet,walletConnected));
        const userBalance = Number(await checkBalance(wallet,walletConnected));
        const rewardBal = Number(await checkRewardBalance(wallet,walletConnected));
  
        setViewFunc({rewardR:rewardRate,totalS:totalStaked,userB:userBalance,rewardB:rewardBal})
        setDataFetched(true)
      }
      catch(error){
        toast.error(error)
      }
    }

    // rewardRate.wait()
    fetchData()
  },[])
  

  return (
    <div className='h-screen w-screen flex items-center justify-center p-3 z-20'>

      <div className=' h-[95%]  w-[70%] flex flex-col gap-10 items-center justify-center '>

        <div className='shadow-lg dark:bg-black/50 light-circle border-[0.5px] border-slate-300 dark:border-none transition-all duration-500 h-[20%] w-full flex justify-center items-center rounded-3xl'>
         Staking Dapp
        </div>

        <div className='h-[50%] w-full flex flex-col gap-5 items-center rounded-3xl'>

          {/* View functions starts here */}
          <div className=' w-full h-[25%] flex items-center justify-center gap-5'>

              <div className='dark:bg-black/50 dark:shadow-none hover light-circle border-[0.5px] border-slate-300 dark:border-none rounded-3xl h-full w-[25%] flex flex-col items-center justify-center'>

                <div className=' font-semibold text-gray-500'>
                  Total Staked Tokens
                </div>

                <div>
                  {dataFetched ? viewFunc.totalS : "Loading..."}
                </div>

              </div>

              <div className='dark:bg-black/50 dark:shadow-none hover light-circle border-[0.5px] border-slate-300 dark:border-none rounded-3xl h-full w-[25%] flex flex-col items-center justify-center'>


                <div className=' font-semibold text-gray-500'>
                  Reward Rate
                </div>

                <div>
                  {dataFetched ? viewFunc.rewardR : "Loading..."}
                </div>

              </div>

              <div className='dark:bg-black/50 dark:shadow-none hover light-circle border-[0.5px] border-slate-300 dark:border-none rounded-3xl h-full w-[25%] flex flex-col items-center justify-center'>

                <div className=' font-semibold text-gray-500'>
                  Balance
                </div>

                <div>
                  {dataFetched ? viewFunc.userB : "Loading..."}
                </div>

              </div>

              <div className='dark:bg-black/50 dark:shadow-none hover light-circle border-[0.5px] border-slate-300 dark:border-none rounded-3xl h-full w-[25%] flex flex-col items-center justify-center'>
                
                <div className=' font-semibold text-gray-500'>
                  Rewards Accumilated
                </div>

                <div>
                  {dataFetched ? viewFunc.rewardB : "Loading..."}
                </div>

              </div>

          </div>
          {/* View functions ends here */}

          {/* State Variable functions starts here */}
          <div className='flex items-center gap-5 w-full h-[75%]'>

            <div className='h-full w-[50%] flex flex-col items-center gap-5 '>

              <form className='flex flex-col items-start justify-center pl-2 dark:bg-black/50 dark:shadow-2xl light-circle border-[0.5px] border-slate-300 hover:shadow-inner transition duration-500 dark:border-none h-[50%] w-full'>
                <input type="number" placeholder='$0.00' className=' bg-transparent rounded-md text-2xl  h-30 outline-none remove-arrow'/>
                <button className='ml-[70%] dark:dark-rectangle light-rectangle rounded-xl hover:shadow-inner border-slate-300 px-10 py-2 dark:border-black border-[0.5px] transition-all duration-500 cursor-pointer '>Stake</button>

              </form>

              <div className=' dark:bg-black/50 dark:shadow-2xl light-circle border-[0.5px] border-slate-300 hover:shadow-inner transition duration-500 dark:border-none h-[50%] w-full flex justify-center items-center '>
                Claim rewards
              </div>
            </div>

            <div className='h-full w-[50%] flex flex-col items-center gap-5'>

              <div className=' dark:bg-black/50 dark:shadow-2xl light-circle border-[0.5px] border-slate-300 hover:shadow-inner transition duration-500 dark:border-none h-[50%] w-full flex justify-center items-center '>
                Withdraw
              </div>

              <div className=' dark:bg-black/50 dark:shadow-2xl light-circle border-[0.5px] border-slate-300 hover:shadow-inner transition duration-500 dark:border-none h-[50%] w-full flex justify-center items-center '>
                Mint
              </div>

            </div>

          </div>
          {/* State Variable functions ends here */}

        </div>

        <div className=' dark:bg-black/50 dark:shadow-none light-circle border-[0.5px] border-slate-300 dark:border-none h-[20%] w-full flex justify-center items-center rounded-3xl'>
          Social handles /description
        </div>
        
      </div>
      

    </div>
  )
}

export default Dashboard


// {/* This is the left side */}
// <div className='h-full w-[80%] flex flex-col p-3 gap-8'>
            
// <div className='w-full h-[35%] flex justify-center items-center gap-8 p-2'>

//   <div className='h-full w-[50%] bg-white/50  rounded-3xl dark:dark:dark-circle light-circle border-[0.5px] border-slate-300 dark:border-slate-700 flex flex-col justify-center items-center'>
//     <input className='bg-transparent outline-none ' placeholder="Stake Tokens" name="" id="Stake" ></input>
//     <button>Stake</button>
//   </div>

//   <div className='h-full w-[50%] bg-white/50  rounded-3xl dark:dark-circle flex flex-col justify-center items-center'>
//     Withdraw
//   </div>

// </div>

// <div className='w-full h-[35%] flex justify-center items-center gap-8 p-2'>

//   <div className='h-full w-[50%] bg-white/50  rounded-3xl dark:dark-circle flex flex-col justify-center items-center'>
//     <input className='bg-transparent outline-none ' placeholder="Stake Tokens" name="" id="Stake" ></input>
//     <button>Claim</button>
//   </div>

//   <div className='h-full w-[50%] bg-white/50  rounded-3xl dark:dark-circle flex flex-col justify-center items-center'>
//     Mint
//   </div>

// </div>

// </div>

// {/* This is the Right side */}
// <div className=' bg-blue-400 h-full w-[80%] flex flex-col'>




// </div>