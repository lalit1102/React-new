import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MarketplaceProvider } from './context/MarketplaceContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import SellerDashboard from './pages/SellerDashboard'
import './App.css'

function App() {
  return (
    <MarketplaceProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/seller" element={<SellerDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </MarketplaceProvider>
  )
}

export default App
