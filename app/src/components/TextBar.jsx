import React from 'react'
import { SendHorizontal } from 'lucide-react'


const TextBar = () => {
  return (
    <div className="mt-auto px-10 py-8 w-[50rem] mx-auto">
      <div className="flex relative w-full align-items">
        <input type="text" name="textInput" id="textInput" placeholder="Type here..." className="bg-transparent rounded-xl border border-neutral-700 px-4 py-3 w-full flex-grow text-white placeholder:text-neutral-700" />
        <button className="text-neutral-700 bg-neutral-900 rounded-xl p-2 border border-neutral-800 absolute right-[0.35rem] top-[0.35rem] hover:bg-neutral-800 transition-all duration-200">
          <SendHorizontal size={20} className='text-white transition-all duration-200' />
        </button>

      </div>
    </div>
  )
}

export default TextBar