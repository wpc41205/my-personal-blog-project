import React from 'react'

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-[100vw] h-[80px] bg-[#F9F8F6] border-b pt-4 pr-[120px] pb-4 pl-[120px]">
        <div className="flex gap-6">
            <h1 className="text-[#26231E] text-3xl font-poppins font-bold">Wave-MaShare <span className="text-[#128279]">.</span></h1>
        </div>
      <div className="flex gap-2">
        <button className="w-[127px] h-12 px-10 py-3 rounded-[999px] border border-[#757168] text-[#26231E] hover:bg-[#757168] hover:text-white">Login</button>
        <button className="w-[141px] h-12 px-10 py-3 rounded-[999px] bg-[#26231E] text-white hover:bg-[#757168]">Sign Up</button>
      </div>
    </div>
  )
}

export default Navbar