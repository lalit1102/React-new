import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Course from './pages/Course'
import Project from './pages/Project'
import Registration from './pages/Registration'
import Reviews from './pages/Reviews'
import AITools from './pages/AITools'
import Database from './pages/Database'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/course" element={<Course />} />
          <Route path="/project" element={<Project />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/database" element={<Database />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

