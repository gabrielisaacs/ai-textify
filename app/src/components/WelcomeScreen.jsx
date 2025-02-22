import React from 'react'
import { NotepadText, Languages, Radar } from 'lucide-react'

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <img src="/logo.svg" alt="Textify Logo" className="w-32 h-32 lg:w-40 lg:h-40 mb-4" />
      <h1 className="text-[3rem] text-white mb-2 font-display">Hi, I'm Textify</h1>
      <p className="text-center text-lg gap-2 justify-center mt-2 max-w-[25rem] text-neutral-400">
        I can detect language, translate and summarize text. Type below to begin...
      </p>
      <div className="h-[5rem] sm:hidden md:flex"></div>
    </div>
  )
}

export default WelcomeScreen