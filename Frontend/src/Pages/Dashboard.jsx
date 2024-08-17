import React from 'react'

const Dashboard = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center p-3'>

      <div className=' h-[95%]  w-[70%] flex flex-col gap-10 items-center justify-center '>

        <div className='border-[0.5px] shadow-lg dark:dark-circle light-circle  border-slate-300 hover:dark:border-gray-500 dark:border-black/40 transition-all duration-500 h-[20%] w-full flex justify-center items-center rounded-3xl'>
         Staking Dapp
        </div>

        <div className='h-[50%] w-full flex flex-col gap-5 items-center rounded-3xl'>

          <div className=' w-full h-[25%] flex items-center justify-center gap-5'>

              <div className='dark:dark-circle light-circle border-[0.5px] border-slate-300 dark:border-slate-700 rounded-3xl h-full w-[25%] flex items-center justify-center'>
                total staked tokens
              </div>

              <div className='dark:dark-circle light-circle border-[0.5px] border-slate-300 dark:border-slate-700 rounded-3xl h-full w-[25%] flex items-center justify-center'>
                Reward Rate
              </div>

              <div className='dark:dark-circle light-circle border-[0.5px] border-slate-300 dark:border-slate-700 rounded-3xl h-full w-[25%] flex items-center justify-center'>
                Connected wallet balance
              </div>

              <div className='dark:dark-circle light-circle border-[0.5px] border-slate-300 dark:border-slate-700 rounded-3xl h-full w-[25%] flex items-center justify-center'>
                View rewards accumilated
              </div>

          </div>

          <div className='flex items-center gap-5 w-full h-[75%]'>

            <div className='h-full w-[50%] flex flex-col items-center gap-5 '>
              <div className=' dark:dark-circle light-circle border-[0.5px] border-slate-300 dark:border-slate-700 h-[50%] w-full flex justify-center items-center '>
                Stake
              </div>

              <div className=' dark:dark-circle light-circle border-[0.5px] border-slate-300 dark:border-slate-700 h-[50%] w-full flex justify-center items-center '>
                Claim rewards
              </div>
            </div>

            <div className='h-full w-[50%] flex flex-col items-center gap-5'>

              <div className=' dark:dark-circle light-circle border-[0.5px] border-slate-300 dark:border-slate-700 h-[50%] w-full flex justify-center items-center '>
                Withdraw
              </div>

              <div className=' dark:dark-circle light-circle border-[0.5px] border-slate-300 dark:border-slate-700 h-[50%] w-full flex justify-center items-center '>
                Mint
              </div>

            </div>

          </div>

        </div>

        <div className=' dark:dark-circle light-circle border-[0.5px] border-slate-300 dark:border-slate-700 h-[20%] w-full flex justify-center items-center rounded-3xl'>
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