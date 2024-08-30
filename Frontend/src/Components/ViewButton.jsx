import React from 'react'

const ViewButton = ({text,data}) => {

  const viewButtonProperties = "dark:bg-black/50 dark:shadow-none hover light-circle border-[0.5px] border-slate-300 dark:border-none rounded-3xl h-full w-[25%] flex flex-col items-center justify-center"

  return (
    <button className="dark:bg-black/50 dark:shadow-none hover light-circle border-[0.5px] border-slate-300 dark:border-none rounded-3xl h-full w-[25%] flex flex-col items-center justify-center">

                <div className=' font-semibold text-gray-500'>
                  {text}
                </div>

                <div>
                  {data}
                </div>

    </button>
  )
}

export default ViewButton
