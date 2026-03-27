import React, { useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage (cart, token, user data, etc.)
    localStorage.removeItem("cart");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  const handleRedirect = () => {
    navigate("/"); // Or navigate("/login") if you have a login page
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to top, #330000, #000)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        px: 3,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontFamily: "'Metal Mania', cursive",
              color: "#FFD700",
              mb: 2,
            }}
          >
            You’ve been logged out
          </Typography>
          <Typography variant="h6" color="gray" sx={{ mb: 4 }}>
            Thank you for visiting. Come back soon for more epic adventures!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleRedirect}
            sx={{
              backgroundColor: "red",
              px: 5,
              py: 1.5,
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#ff3333",
              },
            }}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Logout;
