import React, { useState } from 'react'
import NavBar from './components/NavBar'
import TextBar from './components/TextBar'
import Sidebar from './components/Sidebar'

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='flex flex-col bg-[#000] w-full h-screen'>
      <NavBar onSidebarToggle={toggleSidebar} />
      <div className="flex flex-1 relative mt-[4rem]">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto">
          {/* Chat messages will go here */}
          <div className="min-h-[calc(100vh-8rem)] p-4">
            {/* Messages container */}
          </div>
        </main>
      </div>
      <TextBar />
    </div>
  )
}

export default App