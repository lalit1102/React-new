import { createContext, useContext, useState, useEffect } from 'react'

const MarketplaceContext = createContext()

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext)
  if (!context) {
    throw new Error('useMarketplace must be used within MarketplaceProvider')
  }
  return context
}

export const MarketplaceProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', icon: '📱' },
    { id: 2, name: 'Fashion', icon: '👕' },
    { id: 3, name: 'Home & Garden', icon: '🏠' },
    { id: 4, name: 'Sports', icon: '⚽' },
    { id: 5, name: 'Books', icon: '📚' },
    { id: 6, name: 'Toys', icon: '🧸' },
  ])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('masmercat_user')
    const savedCart = localStorage.getItem('masmercat_cart')
    const savedProducts = localStorage.getItem('masmercat_products')

    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      // Initialize with sample products
      const sampleProducts = [
        {
          id: 1,
          title: 'Smartphone Pro Max',
          description: 'Latest model with advanced features and premium design',
          price: 899.99,
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
          category: 'Electronics',
          seller: 'TechStore',
          rating: 4.5,
          reviews: 128,
          stock: 15,
        },
        {
          id: 2,
          title: 'Designer T-Shirt',
          description: 'Premium cotton t-shirt with modern design',
          price: 49.99,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
          category: 'Fashion',
          seller: 'FashionHub',
          rating: 4.2,
          reviews: 89,
          stock: 30,
        },
        {
          id: 3,
          title: 'Garden Tool Set',
          description: 'Complete set of professional gardening tools',
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
          category: 'Home & Garden',
          seller: 'GardenPro',
          rating: 4.7,
          reviews: 156,
          stock: 12,
        },
        {
          id: 4,
          title: 'Basketball',
          description: 'Professional grade basketball for indoor and outdoor use',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500',
          category: 'Sports',
          seller: 'SportsWorld',
          rating: 4.4,
          reviews: 203,
          stock: 45,
        },
        {
          id: 5,
          title: 'Programming Book Collection',
          description: 'Set of 5 books covering modern programming languages',
          price: 99.99,
          image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
          category: 'Books',
          seller: 'BookStore',
          rating: 4.6,
          reviews: 67,
          stock: 20,
        },
        {
          id: 6,
          title: 'Educational Toy Set',
          description: 'STEM learning toys for children ages 5-12',
          price: 59.99,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
          category: 'Toys',
          seller: 'ToyLand',
          rating: 4.8,
          reviews: 142,
          stock: 25,
        },
      ]
      setProducts(sampleProducts)
      localStorage.setItem('masmercat_products', JSON.stringify(sampleProducts))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('masmercat_cart', JSON.stringify(cart))
  }, [cart])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('masmercat_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('masmercat_user')
    }
  }, [user])

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      rating: 0,
      reviews: 0,
    }
    setProducts([...products, newProduct])
    localStorage.setItem('masmercat_products', JSON.stringify([...products, newProduct]))
    return newProduct
  }

  const updateProduct = (productId, updates) => {
    const updated = products.map(p =>
      p.id === productId ? { ...p, ...updates } : p
    )
    setProducts(updated)
    localStorage.setItem('masmercat_products', JSON.stringify(updated))
  }

  const deleteProduct = (productId) => {
    const filtered = products.filter(p => p.id !== productId)
    setProducts(filtered)
    localStorage.setItem('masmercat_products', JSON.stringify(filtered))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    user,
    cart,
    products,
    categories,
    login,
    logout,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addProduct,
    updateProduct,
    deleteProduct,
    getCartTotal,
    getCartItemCount,
  }

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  )
}

