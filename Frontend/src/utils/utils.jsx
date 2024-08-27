import { toast } from "sonner";


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

export const mint = async (wallet, walletConnected) => {
  if (walletConnected) {
    const amount = document.querySelector("#gurkirat").value;  // msg.value , amount
    try {
      const tx = await wallet.contract.mintStakeToken();
      await tx.wait();
    } catch (error) {
      toast.error(error.reason)
     }
  } else {
    toast.error("Please Connect your wallet.");
  }
};

export const stakeToken = async (wallet, walletConnected) => {
  if (walletConnected) {
    const amount = document.querySelector("#gurkirat").value;
     try {
      const tx = await wallet.contract.stake(amount);
      await tx.wait();

      wallet.contract.on("TokenStaking", (staker, stakedAmount) => {
        toast.success(`Staked ${stakedAmount} tokens successfully!`);
      });
      
     } catch (error) {
      toast.error(error.reason)
     }
  } else {
    toast.error("Please Connect your wallet.");
  }
};

export const withdrawToken = async (wallet, walletConnected) => {
  if (walletConnected) {
    const amount = document.querySelector("#gurkirat").value;
     try {
      const tx = await wallet.contract.withdraw(amount);
      await tx.wait();

      wallet.contract.on("TokenWithdrawal", (staker, withdrawAmount) => {
        toast.success(`Withdrawal ${withdrawAmount} tokens successfully!`);
      });
      
     } catch (error) {
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
      
     } catch (error) {
      toast.error(error);
     }
  } else {
    toast.error("Please Connect your wallet.");
  }
};