import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  return (
    <header className="flex flex-col w-screen bg-[#F9F8F6] border-b border-[#DAD6D1]">
      <div className="flex justify-between items-center h-[64px] md:h-[80px] pt-4 pr-4 pb-4 pl-4 md:pr-[120px] md:pl-[120px]">
        <div className="flex gap-6">
          <h1 className="text-[#26231E] text-2xl md:text-3xl font-poppins font-bold">Wave-MaShare <span className="text-[#128279]">.</span></h1>
        </div>
        <div className="hidden md:flex gap-2">
          <button className="w-[127px] h-12 px-10 py-3 rounded-[999px] border border-[#757168] text-[#26231E] hover:bg-[#757168] hover:text-white">Login</button>
          <button className="w-[141px] h-12 px-10 py-3 rounded-[999px] bg-[#26231E] text-white hover:bg-[#757168]">Sign Up</button>
        </div>
        <button
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#DAD6D1] text-[#26231E]"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-2 pt-4 pr-4 pb-4 pl-4 border-t border-[#DAD6D1] bg-[#F9F8F6]">
          <button className="w-[327px] h-[48px] px-[40px] py-[12px] rounded-[999px] border border-[#757168] text-[#26231E] hover:bg-[#757168] hover:text-white">Login</button>
          <button className="w-[327px] h-[48px] px-[40px] py-[12px] rounded-[999px] bg-[#26231E] text-white hover:bg-[#757168]">Sign Up</button>
        </div>
      )}
    </header>
  )
}

export default Navbar