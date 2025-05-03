import { useState } from 'react'
import Routes from './routes/Routes'
import WidgetScreenWidht from './components/Widget/WidgetScreenWidth'

function App() {

  return (
    <div className='w-screen h-screen overflow-y-auto bg-gray-50 font-lexend'>
      <WidgetScreenWidht />
      <Routes />
    </div>
  )
}

export default App
