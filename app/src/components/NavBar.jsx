import React from 'react'
import { Home, BookOpenText, Settings, Github, Menu } from 'lucide-react'

const NavBar = ({ onSidebarToggle }) => {
  return (
    <div className='h-[4rem] w-full border-b px-4 md:px-10 py-2 border-neutral-950 bg-black bg-opacity-20 backdrop-blur-sm fixed top-0 z-50 font-display'>
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="text-white hover:bg-neutral-800 p-2 rounded-lg transition-all duration-200"
        >
          <Menu size={24} />
        </button>
        <div className="inline-flex gap-2 text-white text-xl items-center">
          <a href="#" className='inline-flex gap-2 items-center group'>
            <img src="/logo.svg" alt="logo" className='w-8 h-8' />
            <p className='group-hover:opacity-70 transition-all duration-200'>Textify</p>
          </a>
        </div>
        <div className="hidden md:flex flex-row text-white text-lg gap-8 ml-auto">
          <a href="#" className="inline-flex gap-2 items-center hover:opacity-60 transition-all duration-200">
            <Home size={20} /> Home
          </a>
          <a href="#" className="inline-flex gap-2 items-center hover:opacity-60 transition-all duration-200">
            <BookOpenText size={20} /> User Guide
          </a>
          <a href="#" className="inline-flex gap-2 items-center hover:opacity-60 transition-all duration-200">
            <Settings size={20} /> Settings
          </a>
          <a href="#" className="inline-flex gap-2 items-center transition-all duration-200">
            <button className="flex flex-row bg-transparent border border-neutral-700 rounded-xl px-6 py-2 text-center justify-center items-center gap-1 bg-neutral-950 hover:bg-neutral-800 transition-all duration-200">
              <Github size={18} /> GitHub
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default NavBar