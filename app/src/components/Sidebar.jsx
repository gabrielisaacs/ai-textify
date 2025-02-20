import React from 'react'
import { X, MessageSquare, Clock, Star } from 'lucide-react'

const SideBar = ({ isOpen }) => {
  return (
    <div className={`fixed left-0 top-[4rem] bottom-0 bg-[#000] transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col min-h-full w-[20rem] border-r border-neutral-800">
        <div className="p-4 pl-10">
          <h2 className="text-white text-xl mb-4">History</h2>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-neutral-800">
              <MessageSquare size={18} />
              Recent Chats
            </button>
            <button className="flex items-center gap-2 text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-neutral-800">
              <Clock size={18} />
              History
            </button>
            <button className="flex items-center gap-2 text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-neutral-800">
              <Star size={18} />
              Saved
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar