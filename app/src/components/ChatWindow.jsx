import React, { useState } from 'react'

const ChatWindow = ({ messages, setMessages }) => {
  const [language, setLanguage] = useState("en")

  const handleSummarize = async (id) => {
    const message = messages.find(msg => msg.id === id)
    const summary = await summarizeText(message.text)
    message.summary = summary
    setMessages([...messages])
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
    <div className="py-4 px-10">
      {messages.map((msg) => (
        <div key={msg.id} className="mb-4">
          <p className="text-white">{msg.text}</p>
          <p className="text-neutral-400">Language: {msg.language}</p>
          {msg.summarize && !msg.summary && (
            <button onClick={() => handleSummarize(msg.id)} className="text-blue-500">Summarize</button>
          )}
          {msg.summary && (
            <p className="text-green-500">Summary: {msg.summary}</p>
          )}
          <div className="mt-2">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mr-2">
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
            <p className="text-yellow-500">Translation: {msg.translation}</p>
          )}
        </div>
      ))}
    </div>
  )
}

const summarizeText = async (text) => {
  // Call your summarizer API here
  // For now, we'll fake it
  return "This is a fake summary."
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