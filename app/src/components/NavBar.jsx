import React from 'react'
import { Github, Menu } from 'lucide-react'

const NavBar = ({ onSidebarToggle, onHomeClick }) => {
  return (
    <div className='items-center h-[4rem] w-full border-b px-4 md:px-10 py-3 border-neutral-800 bg-black bg-opacity-20 backdrop-blur-lg fixed top-0 z-50 font-display'>
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="text-white hover:bg-neutral-800 border border-neutral-800 p-1 rounded-lg transition-all duration-200"
        >
          <Menu size={24} />
        </button>
        <div className="inline-flex gap-2 text-white text-lg items-center">
          <button onClick={onHomeClick} className='inline-flex gap-2 items-center group'>
            <img src="/logo.svg" alt="logo" className='w-8 h-8' />
            <p className='group-hover:opacity-70 transition-all duration-200'>Textify</p>
          </button>
        </div>
        <div className="hidden md:flex flex-row text-white text-md gap-8 ml-auto">
          <a href="https://github.com/gabrielisaacs/ai-textify" target='_blank' className="inline-flex gap-2 items-center transition-all duration-200">
            <button className="flex flex-row bg-transparent border border-neutral-700 rounded-lg px-3 py-2 text-center justify-center items-center gap-1 bg-neutral-950 hover:bg-neutral-800 transition-all duration-200">
              <Github size={18} /> GitHub
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default NavBar