import React, { useState } from 'react'
import Button from './Button'
import { MenuIcon } from './Icons'
import { COLORS, FONTS, SPACING } from '../constants'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  return (
    <header className={`flex flex-col w-screen bg-[${COLORS.background}] border-b border-[${COLORS.border}]`}>
      <div className={`flex justify-between items-center h-[64px] md:h-[80px] pt-4 pr-4 pb-4 pl-4 md:pr-[120px] md:pl-[120px]`}>
        <div className="flex gap-6">
          <h1 className={`text-[${COLORS.primary}] text-2xl md:text-3xl ${FONTS.poppins} font-bold`}>
            Wave-MaShare <span className={`text-[${COLORS.accent}]`}>.</span>
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
          className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[${COLORS.border}] text-[${COLORS.primary}]`}
        >
          <span className="sr-only">Open main menu</span>
          <MenuIcon isOpen={isMenuOpen} />
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className={`md:hidden flex flex-col items-center gap-2 pt-4 pr-4 pb-4 pl-4 border-t border-[${COLORS.border}] bg-[${COLORS.background}]`}>
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