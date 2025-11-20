import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, Heart } from 'lucide-react'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, addToCart, user } = useMarketplace()
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Product not found</h2>
            <Link to="/products" className="btn btn-primary">
              <ArrowLeft size={18} />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    navigate('/cart')
  }

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + delta))
    setQuantity(newQuantity)
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="product-detail">
          <div className="product-image-section">
            <div className="main-image">
              <img src={product.image} alt={product.title} />
            </div>
            <button
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label="Add to favorites"
            >
              <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="product-info-section">
            <div className="product-header">
              <h1>{product.title}</h1>
              <div className="product-meta">
                <span className="product-seller">Sold by {product.seller}</span>
                <span className="product-category">{product.category}</span>
              </div>
            </div>

            <div className="product-rating-section">
              <div className="rating">
                <Star size={20} fill="currentColor" />
                <span className="rating-value">{product.rating}</span>
                <span className="reviews-count">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="product-price-section">
              <span className="price">${product.price.toFixed(2)}</span>
              {product.stock > 0 ? (
                <span className="stock-info">In Stock ({product.stock} available)</span>
              ) : (
                <span className="stock-info out-of-stock">Out of Stock</span>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {product.stock > 0 && (
              <div className="product-actions">
                <div className="quantity-selector">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="quantity-btn"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="quantity-btn"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  className="btn btn-primary btn-lg btn-add-cart"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            )}

            {!user && (
              <div className="login-prompt">
                <p>Please <Link to="/login">login</Link> to add items to cart</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2>You might also like</h2>
          <div className="related-grid">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="related-card"
                >
                  <img src={relatedProduct.image} alt={relatedProduct.title} />
                  <h4>{relatedProduct.title}</h4>
                  <span className="related-price">${relatedProduct.price.toFixed(2)}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

