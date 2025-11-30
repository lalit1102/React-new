import { Routes, Route } from 'react-router-dom'

import Header from './Component/Heder/Header'
import Home from './Component/Home/Home'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </>
  )
}

export default App
