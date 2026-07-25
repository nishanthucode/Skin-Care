
# YouthFace E-Commerce Clone - Frontend

A pixel-perfect MERN stack e-commerce clone of youthface.co.in built with React, Vite, and modern web technologies.

## 🚀 Features

- ✅ Fully responsive design (Mobile, Tablet, Desktop)
- ✅ Product listing with filters and sorting
- ✅ Shopping cart with local storage persistence
- ✅ Wishlist functionality
- ✅ Product search
- ✅ Category-based navigation
- ✅ Hero banner carousel
- ✅ Testimonials section
- ✅ FAQ section with accordion
- ✅ Newsletter subscription
- ✅ Trust badges
- ✅ Multi-page routing
- ✅ API integration ready (for backend)

## 📁 Project Structure

```
youthface-clone/
├── public/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── index.css          # Global styles
│   │   └── images/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx         # Main navigation header
│   │   │   └── Header.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx         # Footer with newsletter
│   │   │   └── Footer.css
│   │   ├── ProductCard/
│   │   │   ├── ProductCard.jsx    # Reusable product card
│   │   │   └── ProductCard.css
│   │   ├── CategorySection/
│   │   │   ├── CategorySection.jsx
│   │   │   └── CategorySection.css
│   │   ├── TestimonialSection/
│   │   │   ├── TestimonialSection.jsx
│   │   │   └── TestimonialSection.css
│   │   └── Home/
│   │       ├── HeroBanner.jsx     # Hero carousel
│   │       ├── ProductSection.jsx # Product grid section
│   │       ├── TrustBadges.jsx
│   │       ├── FAQ.jsx
│   │       └── [related CSS files]
│   ├── context/
│   │   └── CartContext.jsx        # Global cart state management
│   ├── pages/
│   │   ├── Home.jsx               # Homepage
│   │   ├── Shop.jsx               # Product listing page
│   │   ├── ProductDetail.jsx      # Product details page
│   │   ├── Cart.jsx               # Shopping cart page
│   │   ├── Wishlist.jsx
│   │   ├── Checkout.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Blog.jsx
│   │   ├── FAQ.jsx
│   │   ├── TrackOrder.jsx
│   │   ├── Account.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── NotFound.jsx
│   ├── utils/
│   │   └── api.js                 # API utility functions
│   ├── App.jsx                    # Main app component with routing
│   └── main.jsx                   # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **Context API** - State management
- **CSS3** - Styling (no framework, custom CSS)

## 📦 Installation

1. **Navigate to project directory:**
   ```bash
   cd youthface-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Update .env file:**
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will start at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🔌 API Integration

The frontend is configured to communicate with a backend API. All API calls are centralized in `src/utils/api.js`:

### Available API Functions:

**Products:**
- `productAPI.getAll(params)` - Get all products
- `productAPI.getById(id)` - Get single product
- `productAPI.getByCategory(category)` - Get products by category
- `productAPI.getBestSellers()` - Get best sellers
- `productAPI.search(query)` - Search products

**User:**
- `userAPI.register(data)` - User registration
- `userAPI.login(data)` - User login
- `userAPI.getProfile()` - Get user profile

**Orders:**
- `orderAPI.create(data)` - Create new order
- `orderAPI.getAll()` - Get user orders

**Reviews:**
- `reviewAPI.create(productId, data)` - Add product review

**Newsletter:**
- `newsletterAPI.subscribe(email)` - Subscribe to newsletter

## 🎨 Key Components

### 1. Header
- Sticky navigation
- Search functionality
- Cart count badge
- Wishlist count badge
- Mobile responsive menu

### 2. Product Card
- Product image with hover effect
- Add to cart button
- Wishlist toggle
- Rating display
- Price with discount

### 3. Cart Context
- Global cart state
- Local storage persistence
- Add/Remove/Update cart items
- Wishlist management
- Cart total calculations

### 4. Hero Banner
- Auto-rotating carousel
- Manual navigation
- Responsive images

### 5. Category Section
- Grid layout
- Hover effects
- Direct category links

### 6. Testimonials
- Customer reviews
- Before/After images
- Rating display
- Carousel navigation

## 📱 Responsive Breakpoints

- **Mobile:** < 576px
- **Tablet:** 576px - 968px
- **Desktop:** > 968px

## 🎯 Features Implemented

### Homepage Sections:
1. ✅ Hero Banner with carousel
2. ✅ Shop by Category
3. ✅ Best Sellers section
4. ✅ Anniversary Sale section
5. ✅ Testimonials carousel
6. ✅ Category tabs
7. ✅ Fragrance collection
8. ✅ Body lotions
9. ✅ Bakhoor products
10. ✅ Trust badges
11. ✅ About section
12. ✅ FAQ accordion
13. ✅ Newsletter subscription

### Functionality:
- ✅ Add to cart
- ✅ Remove from cart
- ✅ Update quantities
- ✅ Wishlist management
- ✅ Product search
- ✅ Category filtering
- ✅ Product sorting
- ✅ Persistent cart (localStorage)
- ✅ Mobile menu
- ✅ Sticky header

## 🔜 Backend Integration TODO

When connecting to the backend:

1. Update `VITE_API_BASE_URL` in `.env`
2. Ensure backend endpoints match the API structure in `utils/api.js`
3. Handle authentication tokens (already implemented in axios interceptors)
4. Replace mock data with real API responses

## 🎨 Color Scheme

```css
--primary-color: #ff69b4 (Hot Pink)
--secondary-color: #ffc0cb (Light Pink)
--dark-color: #333 (Dark Gray)
--light-color: #f8f9fa (Light Gray)
--white: #ffffff
--gray-text: #666
```

## 📝 Notes

- The application uses **Context API** for state management (cart, wishlist)
- **Mock data** is used when backend is unavailable
- All components are **fully responsive**
- **SEO-friendly** with proper meta tags
- **Accessible** with semantic HTML

## 🚀 Next Steps (Backend Tomorrow)

Tomorrow's backend implementation should include:

1. **Product Management**
   - CRUD operations for products
   - Category management
   - Image upload

2. **User Authentication**
   - JWT-based authentication
   - User registration/login
   - Profile management

3. **Order Management**
   - Order creation
   - Order tracking
   - Payment integration

4. **Reviews System**
   - Product reviews
   - Rating system

5. **Admin Panel**
   - Product management
   - Order management
   - User management

## 📄 License

This is a clone project for educational purposes.

## 👨‍💻 Author

MERN Stack Developer

---

**Ready for backend integration! 🚀**
