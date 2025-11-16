import React  from 'react'
import { BrowserRouter as Router, }from 'react-router-dom'
import Navigation from './component/Navigation'

function App() {
  

  return (
    <Router>
      <div className='App'>
          <Navigation />
      </div>
    </Router>
  )
}

export default App
