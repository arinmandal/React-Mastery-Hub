import React from 'react'
import UseState from './Components/UseState'
import './App.css'
import UseEffect from './Components/UseEffect'
import UseRef from './Components/UseRef'
const App = () => {

  return (
    <>
      <h1 className='text-2xl text-red-500 font-bold text-center m-2 underline font-serif'>All Hooks at Here!</h1>
      <div className='flex items-center justify-around'>
        <UseState />
        <UseEffect />
        <UseRef />
      </div>
    </>
  )
}

export default App