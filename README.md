# 🛒 Catalyst — Modern E-Commerce Frontend

> Fullstack E-Commerce Client Application built with **React 19**, **Redux Toolkit**, and **Tailwind CSS**. Inspired by high-end minimalist boutique marketplaces ([Garmentory](https://www.garmentory.com/)).

---

## 🌟 Key Features

- **🛍️ Minimalist Luxury Aesthetics**: Curated typography, custom color palette (`charcoal`, `off-white`, `wine accent`), and smooth scroll animations via AOS.
- **🔍 Real-Time Product Catalog**: Category filtering (*Outerwear*, *Tops*, *Bottoms*, *Accessories*) and real-time debounced product search.
- **🔐 Complete Auth Integration**: User registration, login with *Remember Me* storage logic, and client-side password length validation.
- **🛒 Persistent Cart & Wishlist**: Syncs state with Redux Toolkit and `localStorage` / `sessionStorage` isolated per user session.
- **🛡️ Route Protection**: Guarded access for Checkout, Order History, and Wishlist using custom `<ProtectedRoute>`.
- **⚡ Auto-Logout Interceptor**: Axios response interceptor that automatically purges invalid/expired JWT tokens (401 Unauthorized).
- **📱 Ultra-Responsive Layout**: Custom breakpoint handling for Seamless Mobile, Tablet (iPad), and Desktop viewports.

---

## 📁 Project Structure

```
marketplace-client/
├── public/
│   ├── _redirects             # Netlify/Vercel SPA routing fallback
│   └── hero-unsplash.jpg
├── src/
│   ├── api/                   # Axios instance & API caller modules
│   │   ├── axiosInstance.js
│   │   ├── authApi.js
│   │   ├── orderApi.js
│   │   └── productApi.js
│   ├── components/            # Reusable UI components
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/                 # Main route pages
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Orders.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Register.jsx
│   │   └── Wishlist.jsx
│   └── redux/                 # Redux Toolkit store & slices
│       ├── store.js
│       └── slices/
│           ├── authSlice.js
│           ├── cartSlice.js
│           ├── orderSlice.js
│           ├── productSlice.js
│           └── wishlistSlice.js
├── App.jsx
├── main.jsx
└── index.css                  # Design system & Tailwind theme
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- npm `v9+`

### Installation & Local Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variable**:
   Create a `.env` file in the root of `marketplace-client`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```
