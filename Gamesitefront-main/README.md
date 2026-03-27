# GameVault - Frontend

The frontend of GameVault, a gaming e-commerce platform where users can browse, search, and purchase video games. Built with React 19 and Material-UI.

## Tech Stack

| Technology        | Purpose                          |
|-------------------|----------------------------------|
| React 19          | UI framework                     |
| React Router v7   | Client-side routing              |
| Material-UI (MUI) v7 | UI component library          |
| Framer Motion     | Page transitions & animations    |
| Axios             | HTTP requests to backend API     |
| React Slick & Swiper | Game carousels              |
| Emotion           | CSS-in-JS styling                |

## Features

- **Game Store** - Browse 35+ games with prices, categories, and "Add to Cart" / "Add to Wishlist" actions
- **Categories** - Filter games by genre (Action, Adventure, Racing, Fantasy, Sci-Fi, Horror)
- **Shopping Cart** - View cart items, remove items, move to wishlist, see total price (persisted in localStorage)
- **Checkout** - Confirm purchase and save order to database
- **User Auth** - Signup & Login with JWT authentication
- **Contact/Support** - Submit support requests via a form
- **Admin Panel** - View and manage all contact submissions (login required)
- **New Releases & Trending** - Dedicated sections for new and popular games
- **Dark Gaming Theme** - Dark red/black gradient UI with gold accents and Metal Mania font

## Project Structure

```
src/
├── App.js                    # All route definitions
├── index.js                  # React entry point
│
├── api/
│   └── axios.js              # Axios instance (base URL config)
│
├── Components/
│   ├── Header.jsx            # Navigation bar with cart counter & user info
│   ├── Footer.jsx            # Site footer
│   ├── AuthContext.jsx        # Authentication state provider
│   ├── ProtectedRoute.jsx    # Restricts routes to logged-in users
│   └── Privateroute.jsx      # Alternate route guard
│
├── Pages/
│   ├── Landing.jsx           # Home page with hero section
│   ├── Store.jsx             # Main game catalog (35+ games)
│   ├── Cart.jsx              # Shopping cart page
│   ├── Transaction.jsx       # Checkout & payment confirmation
│   ├── Caategories.jsx       # Browse games by category
│   ├── Newrelease.jsx        # New game releases
│   ├── Toprating.jsx         # Top trending games
│   ├── Login.jsx             # User login form
│   ├── Signup.jsx            # User registration form
│   ├── Logout.jsx            # Handles user logout
│   ├── Support.jsx           # Contact/support form
│   ├── Contact.jsx           # Admin view - all contact submissions
│   ├── Feedback.jsx          # Customer feedback carousel
│   ├── Gamearena.jsx         # Game arena section
│   ├── Hero.jsx              # Hero banner component
│   ├── Welcome.jsx           # Welcome section
│   ├── Topdeals.jsx          # Top deals section
│   └── Details.jsx           # Game details (placeholder)
│
└── Assests/                  # Game images, logos, icons, GIFs
```

## Pages & Routes

| Route           | Page Component   | Description                          | Login Required |
|-----------------|------------------|--------------------------------------|----------------|
| `/`             | Landing          | Home page with hero & featured games | No             |
| `/store`        | Store            | Full game catalog with add to cart   | No             |
| `/cart`         | Cart             | View and manage cart items           | No             |
| `/transaction`  | Transaction      | Checkout and payment confirmation    | No             |
| `/categories`   | Categories       | Browse games filtered by genre       | No             |
| `/newrelease`   | Newrelease       | New game releases                    | No             |
| `/toptrending`  | Toprating        | Top trending games                   | No             |
| `/support`      | Support          | Submit a contact/support form        | No             |
| `/login`        | Login            | User login                           | No             |
| `/sign`         | Signup           | User registration                    | No             |
| `/logout`       | Logout           | Logs out the current user            | No             |
| `/contact`      | Contact          | Admin - view all submissions         | Yes            |

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** (comes with Node.js)
- Backend server running at `http://localhost:3001` (see backend README)

### Installation

```bash
# Navigate to the frontend directory
cd Gamesitefront-main

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
REACT_APP_API_URL=http://localhost:3001
```

### Run the App

```bash
# Start the development server
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000). It hot-reloads on file changes.

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## How It Works

### Authentication Flow
1. User signs up at `/sign` - data is sent to the backend and stored in MongoDB
2. User logs in at `/login` - backend returns a JWT token
3. Token and username are stored in localStorage
4. Header displays the logged-in username
5. Protected routes (like `/contact`) redirect to `/login` if not authenticated

### Shopping Flow
1. Browse games on `/store` or `/categories`
2. Click "Add to Cart" - item is saved to localStorage
3. Cart icon in the header updates with item count
4. Go to `/cart` to review items, remove, or move to wishlist
5. Proceed to `/transaction` to confirm purchase
6. Each item is saved to the backend database on confirmation

### Data Storage
- **localStorage** - Cart items, wishlist, username, auth token
- **Backend API** - User accounts, contact form submissions, purchase history

## Dependencies

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.2",
  "axios": "^1.10.0",
  "@mui/material": "^7.1.1",
  "@mui/icons-material": "^7.1.1",
  "@mui/x-data-grid": "^8.5.1",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0",
  "framer-motion": "^12.16.0",
  "react-slick": "^0.30.3",
  "slick-carousel": "^1.8.1",
  "swiper": "^11.2.8",
  "uuid": "^11.1.0"
}
```

## Available Scripts

| Command          | Description                              |
|------------------|------------------------------------------|
| `npm start`      | Run dev server at localhost:3000         |
| `npm run build`  | Create production build in `build/`      |
| `npm test`       | Run tests with Jest                      |
| `npm run eject`  | Eject from Create React App (one-way)    |
