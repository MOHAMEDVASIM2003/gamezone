import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../Components/AuthContext"; // ✅ ADD THIS
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "@fontsource/roboto";

export default function Login() {
  const { setIsAuthenticated } = useAuth(); // ✅ GET SETTER
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setSnackbar({
        open: true,
        message: "Please fill all fields",
        severity: "warning",
      });
      return;
    }

    try {
      const response = await API.get("/api/getlogin");
      const users = response.data;

      const matchedUser = users.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (matchedUser) {
        setIsAuthenticated(true);
        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

        setTimeout(() => {
          navigate("/contact");
        }, 1000);
      } else {
        setSnackbar({
          open: true,
          message: "Invalid email or password.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setSnackbar({
        open: true,
        message: "Server error. Please try again later.",
        severity: "error",
      });
    }

    setFormData({ email: "", password: "" });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1e1e1e, #2c2c2c)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: { xs: "100%", sm: 400 },
          borderRadius: 3,
          backgroundColor: "#121212",
          color: "white",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: "bold",
            textAlign: "center",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "#ff1744",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#ff4569",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
