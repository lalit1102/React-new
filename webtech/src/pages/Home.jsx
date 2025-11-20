import { Link } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'
import { ShoppingBag, TrendingUp, Shield, Star } from 'lucide-react'
import './Home.css'

const Home = () => {
  const { products, categories } = useMarketplace()
  const featuredProducts = products.slice(0, 6)

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">MasMercat</span>
            </h1>
            <p className="hero-subtitle">
              Discover amazing products from trusted sellers. Shop with confidence 
              and enjoy seamless shopping experience on any device.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">
                <ShoppingBag size={20} />
                Shop Now
              </Link>
              <Link to="/seller" className="btn btn-outline btn-lg">
                Become a Seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>Secure Payments</h3>
              <p>Your transactions are protected with industry-standard encryption</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp size={32} />
              </div>
              <h3>Best Prices</h3>
              <p>Compare prices from multiple sellers and get the best deals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Star size={32} />
              </div>
              <h3>Quality Products</h3>
              <p>Verified sellers and quality-checked products for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/products?category=${category.name}`}
                className="category-card"
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products" className="btn btn-outline">
              View All
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="product-card"
              >
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-seller">by {product.seller}</p>
                  <div className="product-rating">
                    <Star size={16} fill="currentColor" />
                    <span>{product.rating}</span>
                    <span className="reviews-count">({product.reviews})</span>
                  </div>
                  <div className="product-price">${product.price.toFixed(2)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
