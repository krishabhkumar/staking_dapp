import {CiLogout} from "./Icons"

const Logout = ({settingWallet}) => {

  const disconnect = () =>{
    settingWallet(null,null,null,false)
  }

  return (
    <nav className="sticky top-0 p-2 flex justify-center  h-20 items-center w-fit ml-[0%]  z-10 space-x-3">
        <button onClick={disconnect} className="flex items-center justify-center dark:dark-circle light-circle hover:shadow-inner border-[0.5px] border-slate-300 dark:border-slate-700 h-12 w-12 outline-none transition-all duration-500" >
            <span className="transition-all duration-1000">
                <CiLogout className=" text-red-500 text-xl hover:scale-110 transition-all duration-1000" />
            </span>
        </button>
    </nav>
  )
}

export default Logout
