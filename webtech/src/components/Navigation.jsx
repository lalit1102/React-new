import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'
import { ShoppingCart, Menu, X, User, LogOut, Package } from 'lucide-react'
import './Navigation.css'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, getCartItemCount } = useMarketplace()
  const navigate = useNavigate()
  const cartCount = getCartItemCount()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand" onClick={() => setIsMenuOpen(false)}>
            <span className="brand-icon">🛒</span>
            <span className="brand-text">MasMercat</span>
          </Link>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/products" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            
            {user ? (
              <>
                <Link to="/seller" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  <Package size={18} />
                  <span>Seller</span>
                </Link>
                <Link to="/profile" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <button className="navbar-link btn-logout" onClick={handleLogout}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}

            <Link to="/cart" className="navbar-cart" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
