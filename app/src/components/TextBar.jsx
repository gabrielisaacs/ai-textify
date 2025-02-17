import React from 'react'
import { SendHorizontal } from 'lucide-react'

const TextBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-sm border-t border-neutral-950">
      <div className="max-w-[50rem] mx-auto px-4 py-4">
        <div className="flex relative w-full items-center">
          <textarea
            name="textInput"
            id="textInput"
            rows="1"
            placeholder="Type here..."
            className="bg-transparent rounded-xl border border-neutral-700 px-4 py-3 w-full resize-none text-white placeholder:text-neutral-700 pr-12"
          />
          <button className="text-neutral-700 bg-neutral-900 rounded-xl p-2 border border-neutral-800 absolute right-[0.35rem] top-1/2 -translate-y-1/2 hover:bg-neutral-800 transition-all duration-200">
            <SendHorizontal size={20} className='text-white transition-all duration-200' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TextBar