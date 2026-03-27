import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "@fontsource/metal-mania";

const Cart = ({ updateCartCount }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    setCart(cartItems);
    setWishlist(wishlistItems);
    updateCartCount(cartItems.length);
  }, [updateCartCount]);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
    updateCartCount(newCart.length);
  };

  const removeFromWishlist = (index) => {
    const newWishlist = [...wishlist];
    newWishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setWishlist(newWishlist);
  };

  const moveToCart = (game) => {
    const newCart = [...cart, game];
    const newWishlist = wishlist.filter((item) => item.id !== game.id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setCart(newCart);
    setWishlist(newWishlist);
    updateCartCount(newCart.length);
  };

  const purchase = () => {
    if (cart.length > 0) navigate("/transaction");
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Box
      sx={{
        background: "linear-gradient(to top, #330000, #000)",
        minHeight: "100vh",
        color: "white",
        px: { xs: 2, md: 6 },
        py: 6,
      }}
    >
      {/* ── Title ── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography
          sx={{ fontFamily: "'Metal Mania', cursive", fontSize: { xs: "36px", md: "50px" }, mb: 4 }}
        >
          My Cart
        </Typography>
      </motion.div>

      {cart.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 8, color: "gray" }}>
          <ShoppingCartOutlinedIcon sx={{ fontSize: 80, mb: 2, opacity: 0.4 }} />
          <Typography sx={{ fontSize: 24, fontFamily: '"Nevan RUS", sans-serif' }}>
            Your cart is empty.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: { xs: 2, md: 4 }, flexDirection: { xs: "column", lg: "row" }, alignItems: "flex-start" }}>

          {/* ── Cart Items List ── */}
          <Box sx={{ flex: 1, order: { xs: 2, lg: 1 } }}>
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={item.id ?? index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      background: "linear-gradient(135deg, #1a0000, #0d0d0d)",
                      border: "1px solid #2a0000",
                      borderRadius: "12px",
                      p: 2,
                      mb: 2,
                      "&:hover": { boxShadow: "0 0 16px rgba(180,0,0,0.4)" },
                      transition: "box-shadow 0.3s",
                    }}
                  >
                    {/* Thumbnail */}
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      sx={{
                        width: 90,
                        height: 90,
                        objectFit: "cover",
                        borderRadius: "8px",
                        flexShrink: 0,
                      }}
                    />

                    {/* Info */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "16px", mb: 0.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        {item.title}
                      </Typography>
                      {item.category && (
                        <Typography sx={{ fontSize: "12px", color: "#af40ff", mb: 0.5, textTransform: "uppercase", letterSpacing: 1 }}>
                          {item.category}
                        </Typography>
                      )}
                      <Typography sx={{ fontSize: "18px", color: "#00ddeb", fontWeight: "bold" }}>
                        ${item.price.toFixed(2)}
                      </Typography>
                    </Box>

                    {/* Remove */}
                    <IconButton
                      onClick={() => removeFromCart(index)}
                      sx={{ color: "#ff4444", "&:hover": { color: "#ff0000", background: "rgba(255,0,0,0.1)" } }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>

          {/* ── Order Summary ── */}
          <Box
            sx={{
              width: { xs: "100%", lg: "320px" },
              flexShrink: 0,
              order: { xs: 1, lg: 2 },
              background: "linear-gradient(135deg, #1a0000, #0d0d0d)",
              border: "1px solid #2a0000",
              borderRadius: "12px",
              p: { xs: 2, md: 3 },
              position: { lg: "sticky" },
              top: { lg: "100px" },
            }}
          >
            <Typography sx={{ fontFamily: "'Metal Mania', cursive", fontSize: { xs: "20px", md: "24px" }, mb: 2 }}>
              Order Summary
            </Typography>
            <Divider sx={{ borderColor: "#330000", mb: 2 }} />

            {cart.map((item, i) => (
              <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ fontSize: "13px", color: "gray", maxWidth: "65%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: "13px", color: "white" }}>
                  ${item.price.toFixed(2)}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ borderColor: "#330000", my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography sx={{ fontWeight: "bold", fontSize: { xs: "16px", md: "18px" } }}>Total</Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: { xs: "16px", md: "18px" }, color: "#00ddeb" }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={purchase}
                sx={{
                  background: "linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb)",
                  color: "white",
                  fontSize: { xs: "15px", md: "16px" },
                  fontWeight: "bold",
                  py: 1.5,
                  borderRadius: "8px",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                Buy Now
              </Button>
            </motion.div>
          </Box>
        </Box>
      )}

      {/* ── Wishlist ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Typography
          sx={{ fontFamily: "'Metal Mania', cursive", fontSize: { xs: "36px", md: "50px" }, mt: 6, mb: 3 }}
        >
          Wishlist
        </Typography>
      </motion.div>

      {wishlist.length === 0 ? (
        <Typography sx={{ color: "gray", fontSize: 20, fontFamily: '"Nevan RUS", sans-serif' }}>
          Your wishlist is empty.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {wishlist.map((item, index) => (
            <motion.div
              key={item.id ?? index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Box
                sx={{
                  width: { xs: "calc(50vw - 24px)", sm: 200 },
                  minWidth: "140px",
                  maxWidth: "200px",
                  background: "linear-gradient(135deg, #1a0000, #0d0d0d)",
                  border: "1px solid #2a0000",
                  borderRadius: "12px",
                  overflow: "hidden",
                  "&:hover": { boxShadow: "0 0 16px rgba(180,0,0,0.4)" },
                  transition: "box-shadow 0.3s",
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{ width: "100%", height: 120, objectFit: "cover" }}
                />
                <Box sx={{ p: 1.5 }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "14px", mb: 0.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#00ddeb", mb: 1 }}>
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => moveToCart(item)}
                      sx={{ fontSize: "11px", backgroundColor: "red", flex: 1, "&:hover": { backgroundColor: "#cc0000" } }}
                    >
                      Add
                    </Button>
                    <IconButton
                      size="small"
                      onClick={() => removeFromWishlist(index)}
                      sx={{ color: "gray", "&:hover": { color: "#ff4444" } }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Cart;
