import React from 'react'
import NavBar from './components/NavBar'
import TextBar from './components/TextBar'

const App = () => {
  return (
    <div className='flex bg-[#000] w-full h-screen'>
      <NavBar />
      <TextBar />
    </div>
  )
}

export default App