import Login from "./Pages/Login"
import Dashboard from "./Pages/Dashboard"
import Darkmode from "./Components/Darkmode"
import Shooting from "./Components/ShootingStars/Shooting"
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";


function App() {


  return (
    <>
      <div className='z-10 relative h-screen w-screen dark:text-white bg-slate-50 dark:bg-[#252423]  transition-all duration-500'>
        <div className="absolute w-screen">
          <Darkmode />
        </div>
        <div className="">

        <Shooting />
        </div>

        <Router>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/Dashboard" element={<Dashboard/>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
