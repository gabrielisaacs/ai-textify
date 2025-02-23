import React, { useState, useRef, useEffect } from 'react'
import getLanguageName from '../utils/languageMapper'
import { NotepadText, Languages } from 'lucide-react'

const ChatWindow = ({ messages, setMessages }) => {
  const [language, setLanguage] = useState("en")
  const [loadingMessageId, setLoadingMessageId] = useState(null)
  const [errors, setErrors] = useState({})
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, errors])

  const handleSummarize = async (id) => {
    const message = messages.find(msg => msg.id === id)
    setLoadingMessageId(id)
    try {
      const summary = await summarizeText(message.text)
      message.systemMessage = `I detected that the text is in ${getLanguageName(message.language)}. I've generated a concise summary of the content.`
      message.summary = summary
      message.processed = true
      setMessages([...messages])
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }))
    } catch (error) {
      console.error("Summarization error:", error)
      setErrors(prev => ({
        ...prev,
        [id]: "Unable to summarize the text. The Summarizer API is not usable on this device."
      }))
    }
    setLoadingMessageId(null)
  }

  const handleTranslate = async (id) => {
    const message = messages.find(msg => msg.id === id)
    setLoadingMessageId(id)
    try {
      const translation = await translateText(message.text, language)
      message.systemMessage = `I detected that the text is in ${getLanguageName(message.language)}. I've translated it to ${getLanguageName(language)}.`
      message.translation = translation
      message.processed = true
      setMessages([...messages])
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }))
    } catch (error) {
      console.error("Translation error:", error)
      setErrors(prev => ({
        ...prev,
        [id]: "Unable to create translator for the given source and target language."
      }))
    }
    setLoadingMessageId(null)
  }


  return (
    <div className="sm:p-4 lg:pt-4 lg:px-10 lg:mb-[7rem] lg:w-3/4 w-full mx-auto flex flex-col gap-4">
      {messages.map((msg) => (
        <div key={msg.id} className="flex flex-col py-4 lg:p-4 shadow-lg text-[1rem]">
          <p className="text-[#fff] mb-2 bg-neutral-900 border border-neutral-800 p-4 rounded-lg w-[17rem] lg:max-w-[30rem] shadow-lg ml-auto text-justify">
            {msg.text}
          </p>

          <p className="text-sm p-2 w-max ml-auto text-neutral-500 mb-2">
            Language Detected: {getLanguageName(msg.language)}
          </p>

          {!msg.processed && (
            <div className="flex lg:flex-row flex-col items-center justify-end ml-auto gap-2 mb-4">
              <button
                onClick={() => handleSummarize(msg.id)}
                className="bg-[#0a0] hover:bg-opacity-80 font-display font-bold border w-[10rem] px-6 py-3 border-neutral-800 rounded-lg transition-colors duration-200 flex items-center gap-2"
                disabled={loadingMessageId === msg.id}
              >
                <NotepadText size={20} />
                {loadingMessageId === msg.id ? "Summarizing..." : "Summarize"}
              </button>
              <button
                onClick={() => handleTranslate(msg.id)}
                className="bg-[#3b82f6] text-white hover:bg-opacity-80 font-display font-bold border w-[10rem] px-6 py-3 border-neutral-800 rounded-lg transition-colors duration-200 flex items-center gap-2"
                disabled={loadingMessageId === msg.id}
              >
                <Languages size={20} className='text-white' />
                {loadingMessageId === msg.id ? "Translating..." : "Translate"}
              </button>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-[#000] bg-neutral-300 px-0 py-3 font-display w-[10rem] rounded-md outline-none"
              >
                <option value="en">English</option>
                <option value="pt">Portuguese</option>
                <option value="es">Spanish</option>
                <option value="ru">Russian</option>
                <option value="tr">Turkish</option>
                <option value="fr">French</option>
              </select>
            </div>
          )}

          {msg.systemMessage && (
            <div className="flex flex-row w-[18rem] lg:max-w-[40rem] mb-2 mt-4 gap-2">
              <img src="/logo.svg" alt="logo" className="w-4 h-4 mt-[2px]" />
              <p className="text-neutral-300 text-sm">
                {msg.systemMessage}
              </p>
            </div>
          )}

          {msg.summary && (
            <p className="text-[1rem] text-[#fff] mt-2 mb-6 bg-[#000] p-4 rounded-lg w-[18rem] lg:max-w-[40rem] border border-neutral-800 shadow-lg">
              {msg.summary}
            </p>
          )}
          {msg.translation && (
            <p className="text-[1rem] text-[#fff] mt-2 mb-6 bg-[#000] p-4 rounded-lg w-[18rem] lg:max-w-[40rem] border border-neutral-800 shadow-lg">
              {msg.translation}
            </p>
          )}
          {errors[msg.id] && (
            <p className="text-[1rem] text-[#fff] mt-2 mb-2 bg-red-600 p-2 rounded-lg w-[18rem] lg:max-w-[40rem] border border-neutral-800 shadow-lg">
              {errors[msg.id]}
            </p>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

const summarizeText = async (text) => {
  if ('ai' in self && 'summarizer' in self.ai) {
    const summarizerCapabilities = await self.ai.summarizer.capabilities()
    const available = summarizerCapabilities.available
    let summarizer

    if (available === 'no') {
      throw new Error('Summarizer API not usable')
    }

    const options = {
      type: 'tl;dr',
      format: 'plain-text',
      length: 'short'
    }

    if (available === 'readily') {
      summarizer = await self.ai.summarizer.create(options)
    } else if (available === 'after-download') {
      summarizer = await self.ai.summarizer.create({
        ...options,
        monitor(m) {
          m.addEventListener('downloadprogress', (e) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
          })
        },
      })
      await summarizer.ready
    }

    const summary = await summarizer.summarize(text)
    return summary
  }
  throw new Error('Summarizer API not supported')
}

const translateText = async (text, targetLanguage) => {
  if ('ai' in self && 'translator' in self.ai) {
    const translatorCapabilities = await self.ai.translator.capabilities()
    const availability = translatorCapabilities.languagePairAvailable('en', targetLanguage)

    if (availability === 'no') {
      throw new Error('Language pair not supported')
    }

    const options = {
      sourceLanguage: 'en',
      targetLanguage: targetLanguage
    }

    if (availability === 'after-download') {
      const translator = await self.ai.translator.create({
        ...options,
        monitor(m) {
          m.addEventListener('downloadprogress', (e) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
          })
        },
      })
      await translator.ready
      const translation = await translator.translate(text)
      return translation
    } else {
      const translator = await self.ai.translator.create(options)
      const translation = await translator.translate(text)
      return translation
    }
  }
  throw new Error('Translator API not supported')
}

export default ChatWindow