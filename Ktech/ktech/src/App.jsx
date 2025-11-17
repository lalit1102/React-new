import React  from 'react'
import { Route, BrowserRouter as Router, Routes }from 'react-router-dom'
import Navigation from './component/Navigation'
import Resigstration from './pages/Registration'

function App() {
  

  return (
    <Router>
      <div className='App'>
          <Navigation />
          <Routes>
            <Route path='/registration' element={<Resigstration />} />
          </Routes>
           
          
      </div>
    </Router>
  )
}

export default App
