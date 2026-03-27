import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import API from "../api/axios";
import { v4 as uuidv4 } from "uuid";
import gif3 from "../Assests/gif3.gif";
import "@fontsource/metal-mania";

export default function Support() {
  const [formData, setFormData] = useState({
    UserId: uuidv4().slice(0, 8),
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    YourFeedback: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await API.post("/api/contact", formData);
      setSnackbar({
        open: true,
        message: "Feedback submitted successfully!",
        severity: "success",
      });

      setFormData({
        UserId: uuidv4().slice(0, 8),
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNumber: "",
        Address: "",
        YourFeedback: "",
      });
    } catch (error) {
      console.error("Submission Error:", error);
      setSnackbar({
        open: true,
        message: "Error submitting feedback. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #330000, #000)",
        color: "white",
        px: 4,
        py: 6,
        fontFamily: "'Metal Mania', cursive",
      }}
    >
      {/* Left-Aligned Page Title */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "left",
          mb: 4,
          fontFamily: "'Metal Mania', cursive",
          fontSize: { xs: "32px", md: "48px" },
        }}
      >
        Contact Us
      </Typography>

      {/* Layout: GIF + Form */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 6, md: 8 },
        }}
      >
        {/* Left: GIF */}
        <Paper
          elevation={4}
          sx={{
            width: { xs: "90%", sm: 300, md: 400 },
            height: { xs: 300, sm: 400, md: 450 },
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={gif3}
            alt="Support Visual"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Paper>

        {/* Right: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Paper
            elevation={10}
            sx={{
              width: { xs: "90vw", sm: 400, md: 600 },
              padding: 4,
              backgroundColor: "#1a1a1a",
              borderRadius: 3,
              boxShadow: "0 0 15px rgba(255, 0, 0, 0.5)",
              color: "#fff",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{ style: { color: "#aaa" } }}
                  InputProps={{ style: { color: "#fff" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{ style: { color: "#aaa" } }}
                  InputProps={{ style: { color: "#fff" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{ style: { color: "#aaa" } }}
                  InputProps={{ style: { color: "#fff" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{ style: { color: "#aaa" } }}
                  InputProps={{ style: { color: "#fff" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={2}
                  InputLabelProps={{ style: { color: "#aaa" } }}
                  InputProps={{ style: { color: "#fff" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Feedback"
                  name="YourFeedback"
                  value={formData.YourFeedback}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={4}
                  InputLabelProps={{ style: { color: "#aaa" } }}
                  InputProps={{ style: { color: "#fff" } }}
                />
              </Grid>

              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: "#ff1744",
                    fontWeight: "bold",
                    fontSize: "16px",
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    "&:hover": {
                      backgroundColor: "#ff4569",
                      transform: "scale(1.05)",
                      boxShadow: "0 0 10px rgba(255,0,0,0.5)",
                    },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Box>

      {/* Snackbar Notification */}
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
