import React  from 'react'
import { Route, BrowserRouter as Router, Routes }from 'react-router-dom'
import Navigation from './component/Navigation'
import Registration from './pages/Registration'
// If you also want the list page, keep this import and add a route for it
// import Registrations from './pages/Registrations'
import Registrations from './pages/Registrations'
function App() {
  

  return (
    <Router>
      <div className='App'>
          <Navigation />
          <Routes>
            <Route path='/registration' element={<Registration />} />
            <Route path='/registrations' element={<Registrations />} />
            {/* Example: if you want a registrations list page add:
              <Route path='/registrations' element={<Registrations />} />
            */}
          </Routes>
         
         
          
      </div>
    </Router>
  )
}

export default App
