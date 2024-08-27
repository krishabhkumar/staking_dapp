import { toast } from "sonner";


export const checkPriceOfOneToken = async ({ wallet }) => {
  if (walletConnected) {
    try {
      const price = await wallet.contract.priceOfOneToken();
      toast(price);
    } catch (error) {
      console.error(error);
      toast(error.reason);
    }
  } else {
    toast("Please Connect your wallet.");
  }
};

export const checkTotalStakedToken = async ({ wallet }) => {
  if (walletConnected) {
    try {
      const totalStakedAmount = await wallet.contract.totalStakedToken();
      toast(totalStakedAmount);
    } catch (error) {
      console.log(error);
      toast(error.reason);
    }
  } else {
    toast("Please Connect your wallet.");
  }
}; 

export const checkRewardRate = async ({ wallet }) => {
  if (walletConnected) {
    try {
      const rewardRate = await wallet.contract.REWARD_RATE();
      toast(rewardRate);
    } catch (error) {
      console.log(error);
      toast(error.reason);
    }
  } else {
    toast("Please Connect your wallet.");
  }
};

export const checkBalance = async ({ wallet }) => {
    if (walletConnected) {
        try{
           const balance = await wallet.contract.checkBalance();
           toast(balance);
        } catch (error) {
          console.log(error);
          toast(error.reason);
        }
    }else {
        toast("Please Connect your wallet.");
    }
    
};

export const checkRewardBalance = async ({ wallet }) => {
      if (walletConnected) {
        try {
          const rewardBalance = await wallet.contract.checkRewardBalance();
          toast(rewardBalance);
        } catch (error) {
          console.log(error);
          toast(error.reason);
        }
      } else {
        toast("Please Connect your wallet.");
      }
};

export const totalEarnedReward = async ({ wallet }) => {
       if (walletConnected) {
        try {
          const earnedAmount = await wallet.contract.earned();
          toast(earnedAmount);
        } catch (error) {
          console.log(error);
          toast(error.reason);
        }
       } else {
        toast("Please Connect your wallet.");
      }
};


// view function ends here

export const mint = async ({ wallet }) => {
  if (walletConnected) {
    const amount = document.querySelector("#gurkirat").value;  // msg.value , amount
    try {
      const tx = await wallet.contract.mintStakeToken();
      await tx.wait();
    } catch (error) {
      console.error(error);
     }
  } else {
    toast("Please Connect your wallet.");
  }
};

export const stakeToken = async ({ wallet }) => {
  if (walletConnected) {
    const amount = document.querySelector("#gurkirat").value;
     try {
      const tx = await wallet.contract.stake(amount);
      await tx.wait();

      wallet.contract.on("TokenStaking", (staker, stakedAmount) => {
        toast.success(`Staked ${stakedAmount} tokens successfully!`);
      });
      
     } catch (error) {
      console.error(error);
     }
  } else {
    toast("Please Connect your wallet.");
  }
};

export const withdrawToken = async ({ wallet }) => {
  if (walletConnected) {
    const amount = document.querySelector("#gurkirat").value;
     try {
      const tx = await wallet.contract.withdraw(amount);
      await tx.wait();

      wallet.contract.on("TokenWithdrawal", (staker, withdrawAmount) => {
        toast.success(`Withdrawal ${withdrawAmount} tokens successfully!`);
      });
      
     } catch (error) {
      console.error(error);
     }
  } else {
    toast("Please Connect your wallet.");
  }
};

export const claimReward = async ({ wallet }) => {
  if (walletConnected) {
     try {
      const tx = await wallet.contract.claimReward();
      await tx.wait();
      
     } catch (error) {
      console.error(error);
     }
  } else {
    toast("Please Connect your wallet.");
  }
};