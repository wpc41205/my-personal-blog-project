import React, { useState } from 'react'
import Button from './Button'
import { MenuIcon } from './Icons'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  return (
    <header className="flex flex-col w-screen bg-[#F9F8F6] border-b border-[#DAD6D1]">
      <div className="flex justify-between items-center h-[64px] md:h-[80px] pt-4 pr-4 pb-4 pl-4 md:pr-[120px] md:pl-[120px] w-[90vw] mx-auto">
        <div className="flex gap-6">
          <h1 className="text-[#26231E] text-2xl md:text-3xl font-poppins font-bold">
            Wave-MaShare <span className="text-[#128279]">.</span>
          </h1>
        </div>
        <div className="hidden md:flex gap-2">
          <Button 
            variant="secondary" 
            size="large"
            className="w-[127px] rounded-[999px]"
          >
            Login
          </Button>
          <Button 
            variant="primary" 
            size="large"
            className="w-[141px] rounded-[999px]"
          >
            Sign Up
          </Button>
        </div>
        <button
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#DAD6D1] text-[#26231E]"
        >
          <span className="sr-only">Open main menu</span>
          <MenuIcon isOpen={isMenuOpen} />
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-2 pt-4 pr-4 pb-4 pl-4 border-t border-[#DAD6D1] bg-[#F9F8F6]">
          <Button 
            variant="secondary" 
            size="large"
            className="w-[327px] rounded-[999px]"
          >
            Login
          </Button>
          <Button 
            variant="primary" 
            size="large"
            className="w-[327px] rounded-[999px]"
          >
            Sign Up
          </Button>
        </div>
      )}
    </header>
  )
}

export default Navbar