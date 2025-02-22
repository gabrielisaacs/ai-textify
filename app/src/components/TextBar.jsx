import React, { useState, useRef, useEffect } from 'react'
import { SendHorizontal } from 'lucide-react'

const TextBar = ({ isSidebarOpen, onSend }) => {
  const [text, setText] = useState("")
  const textareaRef = useRef(null)

  const handleSend = () => {
    if (text.trim()) {
      onSend(text)
      setText("")
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [text])

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-transparent transition-all duration-300 ${isSidebarOpen ? 'lg:ml-[20rem] z-10' : 'ml-0'} md:ml-0`}>
      <div className="max-w-[50rem] mx-auto px-4 py-4">
        <div className="flex relative w-full items-center">
          <textarea
            ref={textareaRef}
            name="textInput"
            id="textInput"
            rows="1"
            placeholder="Type here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-[#000] rounded-xl border border-neutral-700 px-4 py-3 w-full resize-none text-white placeholder:text-neutral-700 pr-12 hover:border-[#008800] focus:outline-none focus:border-[#008800] focus-within:outline-none transition-colors duration-300"
            style={{ maxHeight: '8em', overflowY: 'auto' }}
          />
          <button
            onClick={handleSend}
            className="text-neutral-700 bg-neutral-900 rounded-xl p-2 border border-neutral-800 absolute right-[0.35rem] top-1/2 -translate-y-1/2 hover:bg-neutral-800 transition-all duration-200"
          >
            <SendHorizontal size={20} className='text-white transition-all duration-200' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TextBar