import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMarketplace } from '../context/MarketplaceContext'
import { Plus, Edit, Trash2, Package, TrendingUp, DollarSign } from 'lucide-react'
import './SellerDashboard.css'

const SellerDashboard = () => {
  const { user, products, addProduct, updateProduct, deleteProduct, categories } = useMarketplace()
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
    seller: user?.name || '',
  })

  const userProducts = products.filter(p => p.seller === user?.name)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      })
    } else {
      addProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      })
    }

    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image: '',
      seller: user?.name || '',
    })
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      image: product.image,
      seller: product.seller,
    })
    setShowForm(true)
  }

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image: '',
      seller: user?.name || '',
    })
  }

  if (!user) {
    navigate('/login')
    return null
  }

  const totalRevenue = userProducts.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0)
  const totalProducts = userProducts.length
  const totalStock = userProducts.reduce((sum, p) => sum + (p.stock || 0), 0)

  return (
    <div className="seller-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Seller Dashboard</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            <Plus size={20} />
            {showForm ? 'Cancel' : 'Add Product'}
          </button>
        </div>

        {/* Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <Package size={24} />
            </div>
            <div className="stat-info">
              <h3>{totalProducts}</h3>
              <p>Total Products</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-info">
              <h3>{totalStock}</h3>
              <p>Total Stock</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <DollarSign size={24} />
            </div>
            <div className="stat-info">
              <h3>${totalRevenue.toFixed(2)}</h3>
              <p>Potential Revenue</p>
            </div>
          </div>
        </div>

        {/* Product Form */}
        {showForm && (
          <div className="product-form-card">
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Product Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="form-input"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="form-input"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="4"
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div className="products-section">
          <h2>My Products</h2>
          {userProducts.length > 0 ? (
            <div className="products-table">
              {userProducts.map(product => (
                <div key={product.id} className="product-row">
                  <div className="product-row-image">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="product-row-info">
                    <h3>{product.title}</h3>
                    <p className="product-row-category">{product.category}</p>
                    <p className="product-row-price">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="product-row-stock">
                    <span className="stock-badge">{product.stock} in stock</span>
                  </div>
                  <div className="product-row-actions">
                    <button
                      onClick={() => handleEdit(product)}
                      className="btn btn-secondary btn-sm"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Package size={48} />
              <p>No products yet. Add your first product to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard

