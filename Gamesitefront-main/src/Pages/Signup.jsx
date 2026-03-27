import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import API from "../api/axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        Username: formData.username,
        Email: formData.email,
        Password: formData.password,
      };

      const res = await API.post("/api/signup", payload);

      if (res.status === 200) {
        alert("Signup successful!");
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Signup failed. Please try again.";
      alert(errorMsg);
      console.error("Signup Error:", errorMsg);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #1a0000, #000000)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 4,
              background: "linear-gradient(to top right, #330000, #0d0d0d)",
              borderRadius: 4,
              color: "white",
              boxShadow: "0 4px 20px rgba(255, 0, 0, 0.4)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontFamily: "'Metal Mania', cursive", color: "#FFD700" }}
            >
              Create Account
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "gray" } }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                variant="outlined"
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "gray" } }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                type="password"
                variant="outlined"
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "gray" } }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#ff1a1a",
                  "&:hover": { backgroundColor: "#ff4d4d" },
                  fontSize: "16px",
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Signup;
