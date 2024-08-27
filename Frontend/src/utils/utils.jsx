import { toast } from "sonner";

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
    // const amount =   // msg.value , amount
    try {
      const tx = await wallet.contract.mintStakeToken(mValue,{value:mintPrice});
      await tx.wait();
      toast.success("Minted tokens successfully");
    } catch (error) {
      console.error(error)
      toast.error(error.reason)
     }
  } else {
    toast.error("Please Connect your wallet.");
  }
};

export const stakeToken = async (wallet, walletConnected,stakeVal) => {
  if (walletConnected) {
     try {
      const tx = await wallet.contract.stake(stakeVal);
      await tx.wait();
      toast.success("Staked tokens successfully");  
     } catch (error) {
      console.log(error)
      toast.error(error.reason)
     }
  } else {
    toast.error("Please Connect your wallet.");
  }
};

export const withdrawToken = async (wallet, walletConnected,withdrawVal) => {
  if (walletConnected) {
     try {
      const tx = await wallet.contract.withdraw(withdrawVal);
      await tx.wait();
      toast.success("Withdrawn tokens successfully");  
     } catch (error) {
      console.error(error)
      toast.error(error);
     }
  } else {
    toast.error("Please Connect your wallet.");
  }
};

export const claimReward = async (wallet, walletConnected) => {
  if (walletConnected) {
     try {
      const tx = await wallet.contract.claimReward();
      await tx.wait();
      toast.success("Rewards Claimed successfully");  
     } catch (error) {
      console.table(error)
      toast.error(error);
     }
  } else {
    toast.error("Please Connect your wallet.");
  }
};