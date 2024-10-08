import Login from "./Pages/Login"
import Dashboard from "./Pages/Dashboard"
import Darkmode from "./Components/Darkmode"
import Shooting from "./Components/ShootingStars/Shooting"
import ProtectedRoute from "./Components/ProtectedRoute";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useState,useEffect } from "react";


function App() {

  const [wallet, setWallet] = useState({provider:null,contract:null,signer:null});
  const [walletConnected,setWalletConnected] = useState(false)

  const settingWallet = async (provider, contract, signer, walletConn) => {
    //this function sets the provider and signer or EOA address of the client that has logged in
    setWallet({ provider: provider, contract: contract, signer: signer });
    setWalletConnected(walletConn)
  };



  return (
    <>
      <Toaster richColors position="top-center" closeButton/>

      <div className="z-10 relative h-screen w-screen dark:text-white bg-slate-50 dark:bg-black  transition-all duration-500">
                <div className="absolute w-screen">
          <Darkmode />
        </div>
        <div className="">
          <Shooting />
        </div>

        <Router>
          <Routes>
            <Route path="/" element={<Login settingWallet={settingWallet} />} />
            {/* <Route path="/Dashboard" element={<Dashboard wallet={wallet} walletConnected={walletConnected}  />} /> */}
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute walletConnected={walletConnected}>
                  <Dashboard settingWallet={settingWallet} wallet={wallet} walletConnected={walletConnected} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App
