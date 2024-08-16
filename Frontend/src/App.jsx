import Login from "./Pages/Login"
import Darkmode from "./Components/Darkmode"


function App() {


  return (
    <>
      <div className='h-screen w-screen dark:text-white '>
        <div className="absolute w-screen">
          <Darkmode />
        </div>
        <Login />
      </div>
    </>
  )
}

export default App
