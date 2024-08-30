import { toast } from "sonner";
import { ethers } from "ethers";


const getProvider = async() =>{
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider
}

// Mint function 
export const checkPriceOfOneToken = async (wallet, walletConnected) => {
  if (walletConnected) {
    try {
      const price = await wallet.contract.priceOfOneToken();
      return price
    } catch (error) {
      toast.error(error.reason);
    }
  } else {
    toast("Please Connect your wallet.");
  }
};

export const checkTotalStakedToken = async (wallet, walletConnected) => {
  if (walletConnected) {
    try {
      const totalStakedAmount = await wallet.contract.totalStakedToken();
      return totalStakedAmount
    } catch (error) {
      console.log(error);
      toast.error(error.reason);
    }
  } else {
    toast.error("Please Connect your wallet.");
  }
}; 

export const checkRewardRate = async ( wallet,walletConnected) => {
  const provider = getProvider()
  console.log(provider)
  if (walletConnected) {
    try {
      const rewardRate = await wallet.contract.REWARD_RATE();
      return rewardRate
    } catch (error) {
      toast.error(error.reason);
    }
  } else {
    toast.error("Please Connect your wallet.");
  }
};

export const checkBalance = async (wallet, walletConnected) => {
    if (walletConnected) {
        try{
           const balance = await wallet.contract.checkBalance();
           return balance
        } catch (error) {
          toast.error(error.reason);
        }
    }else {
        toast.error("Please Connect your wallet.");
    }
    
};

export const checkRewardBalance = async (wallet, walletConnected) => {
      if (walletConnected) {
        try {
          const rewardBalance = await wallet.contract.checkRewardBalance();
          return rewardBalance
        } catch (error) {
          console.log(error);
          toast.error(error.reason);
        }
      } else {
        toast.error("Please Connect your wallet.");
      }
};

export const totalEarnedReward = async (wallet, walletConnected) => {
       if (walletConnected) {
        try {
          const earnedAmount = await wallet.contract.earned();
          return earnedAmount
        } catch (error) {
          console.log(error);
          toast.error(error.reason);
        }
       } else {
        toast.error("Please Connect your wallet.");
      }
};


// view function ends here

export const mint = async (wallet, walletConnected,mValue,mintPrice) => {
  if (walletConnected) {
    const mintPromise = async () => {
      try {
        const tx = await wallet.contract.mintStakeToken(mValue, { value: mintPrice });
        await tx.wait();
        return { name: 'Mint' }; // the success data to display
      } catch (error) {
        throw error; // rethrow error to handle it in the toast.promise
      }
    };
    toast.promise(mintPromise(), {
      loading: 'Minting tokens...',
      success: (data) => `${data.name}ed tokens successfully!`,
      error: (error) => `Error: ${error.reason || 'Transaction failed'}`,
    });
  } else {
    toast.error("Please Connect your wallet.");
  }
};

export const stakeToken = async (wallet, walletConnected,stakeVal) => {
  if (walletConnected) {
    const stakePromise =async ()=>{
      try {
       const tx = await wallet.contract.stake(stakeVal);
       await tx.wait(); 
       return {name : 'Staked tokens successfully'}
      } catch (error) {
        throw error
      }
    }

    toast.promise(stakePromise(),{
      loading: 'Staking Tokens...',
      success: (data)=>`${data.name}`,
      error: (error) =>`Error: ${error.reason || 'Transaction failed'}`
    })
  } else {
    toast.error("Please Connect your wallet.");
  }
};

export const withdrawToken = async (wallet, walletConnected,withdrawVal) => {
  if (walletConnected) {
    const withdrawPromise =async ()=>{
      try {
       const tx = await wallet.contract.withdraw(withdrawVal);
       await tx.wait();
      return {name: "Withdrawn tokens successfully"}  
      } catch (error) {
        throw error
      }
    }
    toast.promise(withdrawPromise(),{
      loading: 'Withdrawing Tokens...',
      success: (data)=>`${data.name}`,
      error: (error) =>`Error: ${error.reason || 'Transaction failed'}`
    }) 

  } else {
    toast.error("Please Connect your wallet.");
  }
};

export const claimReward = async (wallet, walletConnected) => {
  if (walletConnected) {
    const claimPromise =async()=>{
      try {
       const tx = await wallet.contract.claimReward();
       await tx.wait();
       return {name: "Claimed rewards successfully"}
      } catch (error) {
       throw error
      }
    }
    toast.promise(claimPromise(),{
      loading: 'Claiming Rewards...',
      success: (data)=>`${data.name}`,
      error: (error) =>`Error: ${error.reason || 'Transaction failed'}`
    }) 
  } else {
    toast.error("Please Connect your wallet.");
  }
};