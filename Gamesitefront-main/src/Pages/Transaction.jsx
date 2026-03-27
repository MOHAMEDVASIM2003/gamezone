import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "@fontsource/metal-mania";

const Transaction = () => {
  const [purchasedGames, setPurchasedGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setPurchasedGames(cart);
  }, []);

  const handleConfirm = async () => {
    try {
      await Promise.all(
        purchasedGames.map((game) =>
          API.post("/api/cart", {
            title: game.title,
            price: game.price,
          })
        )
      );
      localStorage.removeItem("cart");
      alert("Payment successful! Thank you for your purchase.");
      navigate("/");
    } catch (error) {
      console.error("Error saving to DB:", error);
      alert("Something went wrong while saving your purchase. Please try again.");
    }
  };

  const totalAmount = purchasedGames.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <Box
      sx={{
        background: "linear-gradient(to top, #330000, #000)",
        color: "white",
        minHeight: "100vh",
        px: { xs: 2, md: 6 },
        py: 6,
      }}
    >
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          sx={{
            fontFamily: "'Metal Mania', cursive",
            fontSize: { xs: "32px", md: "48px" },
            mb: 1,
          }}
        >
          Confirm Your Purchase
        </Typography>
        <Typography sx={{ color: "gray", fontSize: "16px", mb: 4 }}>
          You've selected {purchasedGames.length} awesome game(s) — review before paying.
        </Typography>
      </motion.div>

      {purchasedGames.length === 0 ? (
        <Typography sx={{ color: "gray", fontSize: 20 }}>
          No items to purchase.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "flex-start",
          }}
        >
          {/* ── Items List ── */}
          <Box sx={{ flex: 1 }}>
            {purchasedGames.map((game, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
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
                    "&:hover": { boxShadow: "0 0 16px rgba(180,0,0,0.35)" },
                    transition: "box-shadow 0.3s",
                  }}
                >
                  {/* Thumbnail */}
                  <Box
                    component="img"
                    src={game.image}
                    alt={game.title}
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
                      sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        mb: 0.5,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {game.title}
                    </Typography>
                    {game.category && (
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#af40ff",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          mb: 0.5,
                        }}
                      >
                        {game.category}
                      </Typography>
                    )}
                    <Typography sx={{ fontSize: "18px", color: "#00ddeb", fontWeight: "bold" }}>
                      ${Number(game.price).toFixed(2)}
                    </Typography>
                  </Box>

                  {/* Included badge */}
                  <CheckCircleOutlineIcon sx={{ color: "#00ddeb", fontSize: 28, flexShrink: 0 }} />
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* ── Payment Summary ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ width: "100%", maxWidth: "340px", flexShrink: 0 }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #1a0000, #0d0d0d)",
                border: "1px solid #2a0000",
                borderRadius: "12px",
                p: 3,
                position: { lg: "sticky" },
                top: { lg: "100px" },
              }}
            >
              <Typography
                sx={{ fontFamily: "'Metal Mania', cursive", fontSize: "24px", mb: 2 }}
              >
                Payment Summary
              </Typography>
              <Divider sx={{ borderColor: "#330000", mb: 2 }} />

              {purchasedGames.map((game, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
                >
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "gray",
                      maxWidth: "65%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {game.title}
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: "white" }}>
                    ${Number(game.price).toFixed(2)}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ borderColor: "#330000", my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>Total</Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: "18px", color: "#FFD700" }}>
                  ${totalAmount.toFixed(2)}
                </Typography>
              </Box>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleConfirm}
                  sx={{
                    background: "linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb)",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    py: 1.5,
                    borderRadius: "8px",
                    "&:hover": { opacity: 0.9 },
                  }}
                >
                  Pay Now
                </Button>
              </motion.div>

              <Typography
                sx={{ textAlign: "center", mt: 2, fontSize: "12px", color: "gray" }}
              >
                Secured & encrypted payment
              </Typography>
            </Box>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default Transaction;
