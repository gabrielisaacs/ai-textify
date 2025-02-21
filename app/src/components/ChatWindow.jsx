import React, { useState } from 'react'

const ChatWindow = ({ messages, setMessages }) => {
  const [language, setLanguage] = useState("en")

  const handleSummarize = async (id) => {
    const message = messages.find(msg => msg.id === id)
    try {
      const summary = await summarizeText(message.text)
      message.summary = summary
      setMessages([...messages])
    } catch (error) {
      console.error("Summarization error:", error)
      alert("Unable to summarize the text. The Summarizer API is not usable on this device.")
    }
  }

  const handleTranslate = async (id) => {
    const message = messages.find(msg => msg.id === id)
    try {
      const translation = await translateText(message.text, language)
      message.translation = translation
      setMessages([...messages])
    } catch (error) {
      console.error("Translation error:", error)
      alert("Unable to create translator for the given source and target language.")
    }
  }

  return (
    <div className="sm:p-4 lg:py-4 lg:px-10 lg:w-3/4 mx-auto flex flex-col gap-4 ">
      {messages.map((msg) => (
        <div key={msg.id} className="flex flex-col p-4 shadow-lg text-[1rem]">
          <p className="text-[#fff] mb-2 bg-[#000] p-8 rounded-lg max-w-[40rem] shadow-lg border border-neutral-800 ml-auto text-justify">{msg.text}</p>
          <p className="text-xs text-neutral-400 mb-2">Language Detected: {msg.language}</p>
          {msg.summarize && !msg.summary && (
            <button onClick={() => handleSummarize(msg.id)} className="text-blue-500 mb-2">Summarize</button>
          )}
          {msg.summary && (
            <p className="text-xs text-green-500 mb-2">Summary: {msg.summary}</p>
          )}
          <div className="flex items-center gap-2">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="text-neutral-900 p-1 rounded-md">
              <option value="en">English</option>
              <option value="pt">Portuguese</option>
              <option value="es">Spanish</option>
              <option value="ru">Russian</option>
              <option value="tr">Turkish</option>
              <option value="fr">French</option>
            </select>
            <button onClick={() => handleTranslate(msg.id)} className="text-blue-500">Translate</button>
          </div>
          {msg.translation && (
            <p className="text-[1rem] text-[#fff] mt-2 mb-[10rem] bg-[#000] p-8 rounded-lg max-w-[40rem] border border-neutral-800 shadow-lg">Translation: {msg.translation}</p>
          )}
        </div>
      ))}
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
    if (available === 'readily') {
      summarizer = await self.ai.summarizer.create({
        type: 'tl;dr',
        format: 'plain-text',
        length: 'short'
      })
    } else if (available === 'after-download') {
      summarizer = await self.ai.summarizer.create({
        type: 'tl;dr',
        format: 'plain-text',
        length: 'short',
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
    } else if (availability === 'after-download') {
      const translator = await self.ai.translator.create({
        sourceLanguage: 'en',
        targetLanguage: targetLanguage,
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
      const translator = await self.ai.translator.create({
        sourceLanguage: 'en',
        targetLanguage: targetLanguage
      })
      const translation = await translator.translate(text)
      return translation
    }
  }
  throw new Error('Translator API not supported')
}

export default ChatWindow