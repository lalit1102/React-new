# MasMercat - Hybrid Marketplace Application

MasMercat is a modern, fully responsive hybrid marketplace application built with React and Vite. It provides a seamless shopping experience across smartphones, tablets, and desktop browsers with a single codebase.

## 🚀 Features

### Core Functionality
- **Product Browsing**: Browse products with advanced search and filtering
- **Product Categories**: Organized product categories for easy navigation
- **Product Details**: Detailed product pages with images and descriptions
- **Shopping Cart**: Add, remove, and manage items in your cart
- **Checkout Process**: Complete checkout flow with shipping and payment forms
- **User Authentication**: Login and registration system
- **User Profiles**: Manage your account and view order history
- **Seller Dashboard**: Complete seller interface for managing products
- **Responsive Design**: Mobile-first design that works on all devices

### Technical Features
- **Single Codebase**: One codebase for web and mobile browsers
- **Local Storage**: Persistent data storage using browser localStorage
- **State Management**: React Context API for global state management
- **Routing**: React Router for navigation
- **Modern UI**: Clean, modern interface with smooth animations
- **PWA Ready**: Progressive Web App capabilities

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

## 🛠️ Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd webtech
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📦 Build for Production

### Web Build
```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build
```bash
npm run preview
```

## 📱 Mobile Deployment

### Option 1: Responsive Web App
The application is fully responsive and works seamlessly on mobile browsers. Simply access the deployed URL from any mobile device.

### Option 2: PWA Installation
The app is configured for Progressive Web App (PWA) installation:
1. Open the app on a mobile device
2. Use the browser's "Add to Home Screen" option
3. The app will install and behave like a native app

### Option 3: Hybrid Framework (Future Enhancement)
For native app deployment, you can wrap this React app using:
- **Capacitor** (recommended)
- **Cordova/PhoneGap**
- **React Native Web**

## 🏗️ Project Structure

```
webtech/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navigation.jsx   # Main navigation bar
│   │   └── Footer.jsx       # Footer component
│   ├── context/             # React Context providers
│   │   └── MarketplaceContext.jsx  # Global state management
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Homepage
│   │   ├── Products.jsx     # Product listing page
│   │   ├── ProductDetail.jsx # Product detail page
│   │   ├── Cart.jsx         # Shopping cart
│   │   ├── Checkout.jsx     # Checkout process
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx    # Registration page
│   │   ├── Profile.jsx      # User profile
│   │   └── SellerDashboard.jsx # Seller dashboard
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles
│   ├── main.jsx             # Entry point
│   └── index.css            # Base styles
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── README.md               # This file
```

## 🎨 Key Components

### Navigation
- Responsive navigation bar with mobile menu
- Shopping cart indicator
- User authentication status
- Quick access to main sections

### Product Management
- Product listing with search and filters
- Category-based filtering
- Sort by price, rating, name
- Product detail pages with image gallery
- Add to cart functionality

### Shopping Cart
- View all cart items
- Update quantities
- Remove items
- Calculate totals with tax
- Proceed to checkout

### User System
- User registration
- User login/logout
- Profile management
- Order history (placeholder)

### Seller Dashboard
- Add new products
- Edit existing products
- Delete products
- View statistics
- Manage inventory

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env` file in the root directory for environment-specific configurations:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=MasMercat
```

### Customization
- **Colors**: Modify CSS variables in `src/App.css`
- **Products**: Update sample data in `src/context/MarketplaceContext.jsx`
- **Categories**: Edit categories array in the context file

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 968px
- **Desktop**: > 968px

## 🧪 Testing

Currently, the application uses localStorage for data persistence. For production, you should:

1. **Backend Integration**: Connect to a REST API or GraphQL endpoint
2. **Authentication**: Implement proper JWT or session-based authentication
3. **Payment Processing**: Integrate payment gateway (Stripe, PayPal, etc.)
4. **Image Upload**: Add image upload functionality for sellers
5. **Email Service**: Implement email notifications

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
1. Update `vite.config.js` with base path
2. Build the project: `npm run build`
3. Deploy the `dist` folder to GitHub Pages

### Traditional Hosting
1. Run `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your server to serve the `index.html` for all routes

## 🔐 Security Considerations

For production deployment, implement:
- **HTTPS**: Always use HTTPS in production
- **Input Validation**: Validate all user inputs
- **XSS Protection**: Sanitize user-generated content
- **CSRF Protection**: Implement CSRF tokens
- **Rate Limiting**: Limit API requests
- **Secure Authentication**: Use secure authentication methods

## 📝 API Integration Guide

To connect to a backend API:

1. **Update MarketplaceContext.jsx**
   - Replace localStorage with API calls
   - Add fetch/axios for HTTP requests
   - Implement error handling

2. **Create API Service**
   ```javascript
   // src/services/api.js
   const API_URL = import.meta.env.VITE_API_URL

   export const api = {
     getProducts: () => fetch(`${API_URL}/products`),
     addProduct: (product) => fetch(`${API_URL}/products`, {
       method: 'POST',
       body: JSON.stringify(product)
     }),
     // ... more API methods
   }
   ```

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9
```

**Dependencies not installing**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👥 Support

For issues, questions, or contributions:
1. Check existing issues
2. Create a new issue with detailed description
3. Follow the code style and conventions

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Real payment processing
- [ ] Image upload functionality
- [ ] Email notifications
- [ ] Order tracking
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search with filters
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Push notifications
- [ ] Native app builds (iOS/Android)

## 📊 Performance Optimization

- Images are optimized for web
- Lazy loading for product images
- Code splitting with React Router
- CSS optimization with Vite
- Minified production builds

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**Built with ❤️ using React, Vite, and modern web technologies**
