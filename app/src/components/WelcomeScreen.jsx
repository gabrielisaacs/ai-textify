import React from 'react'
import { NotepadText, Languages, Radar } from 'lucide-react'

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full lg:h-3/4 text-center">
      <img src="/logo.svg" alt="Textify Logo" className="w-40 h-40 mb-4" />
      <h1 className="text-[3rem] text-white mb-2 font-display">Welcome to Textify</h1>
      <div className="flex flex-row items-center gap-2 justify-center mt-4 flex-wrap">
        <div className="flex items-center gap-2 text-[#fff] text-md px-4 py-2 border border-neutral-800 rounded-full">
          <Radar size={20} className='text-[#fcff32]' /> Detect Text Language
        </div>
        <div className="flex items-center gap-2 text-[#fff] text-md px-4 py-2 border border-neutral-800 rounded-full">
          <Languages size={20} className='text-[#0c0]' /> Translate text
        </div>
        <div className="flex items-center gap-2 text-[#fff] text-md px-4 py-2 border border-neutral-800 rounded-full">
          <NotepadText size={20} className='text-[#3b82f6]' /> Summarize Text
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen