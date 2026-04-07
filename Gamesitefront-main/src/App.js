import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Newrelease from "./Pages/Newrelease";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Landing from "./Pages/Landing";
import Store from "./Pages/Store";
import Cart from "./Pages/Cart";
import Toprating from "./Pages/Toprating";
import Categories from "./Pages/Caategories";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import Transaction from "./Pages/Transaction";
import Contactform from "../src/Pages/Support";
// import PrivateRoute from "./Components/Privateroute";
import Signup from "./Pages/Signup";
import Logout from "../src/Pages/Logout";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastProvider } from "./Components/Toast";
// import { AuthProvider } from "./Components/AuthContext";
function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <ToastProvider>
      <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header cartCount={cartCount} />
              <Landing />
              <Footer />
            </>
          }
        />

        <Route
          path="/store"
          element={
            <>
              <Header cartCount={cartCount} />
              <Store updateCartCount={setCartCount} />
              <Footer />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <Header cartCount={cartCount} />
              <Cart updateCartCount={setCartCount} />
            </>
          }
        />

        <Route
          path="/newrelease"
          element={
            <>
              <Header cartCount={cartCount} />
              <Newrelease />
            </>
          }
        />

        <Route
          path="/support"
          element={
            <>
              <Header cartCount={cartCount} />
              <Contactform />
            </>
          }
        />

        <Route
          path="/toptrending"
          element={
            <>
              <Header cartCount={cartCount} />
              <Toprating />
            </>
          }
        />

        <Route
          path="/categories"
          element={
            <>
              <Header cartCount={cartCount} />
              <Categories updateCartCount={setCartCount} />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Header cartCount={cartCount} />
              <Login />
            </>
          }
        />
      <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <>
                <Header cartCount={cartCount} />
                <Contact />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <>
              <Header cartCount={cartCount} />
              <Transaction />
            </>
          }
        />
          <Route
          path="/logout"
          element={
            <>
              <Header cartCount={cartCount} />
              <Logout />
            </>
          }
        />
         <Route
          path="/sign"
          element={
            <>
              <Header cartCount={cartCount} />
              <Signup />
            </>
          }
        />
     
      </Routes>
      
      </Router>
    </ToastProvider>
  );
}

export default App;
