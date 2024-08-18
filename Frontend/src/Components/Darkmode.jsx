
import React from "react";
import { useState, useEffect } from "react";
import {BsMoonStarsFill,PiSunDimFill} from "./Icons";

const Nav = () => {
const [darkMode, setMode] = useState(() => {
  const storedMode = localStorage.getItem('mode');
  return storedMode === 'dark';
});

    
  useEffect(() => {
    localStorage.setItem('mode', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
}, [darkMode]);

const toggleTheme = () => {
  setMode((prevMode) => !prevMode);
};


  return (
<nav className="sticky top-0 p-2 flex justify-end  h-20 items-center w-[10%] ml-[90%]  z-10 space-x-3 ">

    <button onClick={toggleTheme} className="flex items-center justify-center dark:dark-circle light-circle hover:shadow-inner border-[0.5px] border-slate-300 dark:border-slate-700 h-12 w-12 outline-none transition-all duration-500" >
      <span className="transition-all duration-1000">
        {localStorage.getItem('mode') === 'dark' ? <PiSunDimFill className='text-yellow-400 text-2xl hover:scale-110 transition-all duration-1000'/> : <BsMoonStarsFill className='text-white text-xl hover:scale-105 transition-all duration-1000'/>}
      </span>
    </button>
    
</nav>
  )
}

export default Nav