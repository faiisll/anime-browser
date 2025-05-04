import { useState } from 'react'
import Routes from './routes/Routes'
import WidgetScreenWidht from './components/Widget/WidgetScreenWidth'
import useDarkMode from './Hooks/useDarkMode'

function App() {
  const [isDarkMode, toggleDarkMode] = useDarkMode()
  return (
    <div className='w-screen h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors font-lexend'>
      {/* <WidgetScreenWidht /> */}
      <Routes />
    </div>
  )
}

export default App
