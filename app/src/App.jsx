import React, { useState } from 'react'
import NavBar from './components/NavBar'
import TextBar from './components/TextBar'
import SideBar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import WelcomeScreen from './components/WelcomeScreen'

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [showWelcome, setShowWelcome] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSend = async (text) => {
    if (showWelcome) setShowWelcome(false)

    const newMessage = { text, language: "detecting...", id: Date.now() }
    setMessages([...messages, newMessage])

    // Detect language
    const detectedLanguage = await detectLanguage(text)
    newMessage.language = detectedLanguage
    setMessages([...messages, newMessage])

    // Summarize if needed
    if (text.length > 150 && detectedLanguage === "en") {
      newMessage.summarize = true
    }

    setMessages([...messages, newMessage])
  }

  const detectLanguage = async (text) => {
    if ('ai' in self && 'languageDetector' in self.ai) {
      const languageDetectorCapabilities = await self.ai.languageDetector.capabilities()
      const canDetect = languageDetectorCapabilities.available
      let detector

      if (canDetect === 'no') {
        console.error("Language detector is not usable.")
        return "unknown"
      }
      if (canDetect === 'readily') {
        detector = await self.ai.languageDetector.create()
      } else if (canDetect === 'after-download') {
        detector = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener('downloadprogress', (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
            })
          },
        })
        await detector.ready
      }

      const results = await detector.detect(text)
      if (results.length > 0 && results[0].confidence > 0.5) {
        return results[0].detectedLanguage
      } else {
        return "unknown"
      }
    }
    return "unknown"
  }

  const handleHomeClick = () => {
    setShowWelcome(true)
    setMessages([])
  }

  return (
    <div className='flex flex-col bg-[#000] w-full h-screen overflow-x-hidden overflow-y-auto custom-scrollbar'>
      <NavBar onSidebarToggle={toggleSidebar} onHomeClick={handleHomeClick} />
      <div className={`flex flex-1 relative mt-[4rem] transition-all duration-300 ${isSidebarOpen ? 'ml-[20rem]' : 'ml-0'}`}>
        <SideBar isOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto">
          {showWelcome ? <WelcomeScreen /> : <ChatWindow messages={messages} setMessages={setMessages} />}
        </main>
      </div>
      <TextBar isSidebarOpen={isSidebarOpen} onSend={handleSend} />
    </div>
  )
}

export default App