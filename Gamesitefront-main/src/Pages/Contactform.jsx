import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../api/axios";

export default function Contactform() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await API.get("/api/getContact");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setSnackbar({ open: true, message: "Error fetching contacts", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/deleteContact/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setSnackbar({ open: true, message: "Contact deleted successfully", severity: "success" });
    } catch (error) {
      console.error("Delete error:", error);
      setSnackbar({ open: true, message: "Failed to delete contact", severity: "error" });
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.FirstName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        p: 4,
        
        background: "linear-gradient(to top, #330000, #000)", 
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Contact Submissions
      </Typography>

      <TextField
        label="Search by First Name"
        variant="outlined"
        fullWidth
        sx={{ mb: 4 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <CircularProgress />
      ) : filteredContacts.length === 0 ? (
        <Typography>No contacts found.</Typography>
      ) : (
        filteredContacts.map((contact, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              p: 3,
              mb: 2,
              backgroundColor: "black",
              position: "relative",
              border:"2px solid black",
              color:"white",
              boxShadow:"2px 4px 4px 4px rgb(255, 0, 0)",
              gap: 5, 
              position: "relative",
            }}
          >
            <IconButton
              onClick={() => handleDelete(contact._id)}
              sx={{ position: "absolute", top: 8, right: 8 }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {contact.FirstName} {contact.LastName}
            </Typography>
            <Typography>Email: {contact.Email}</Typography>
            <Typography>Phone: {contact.PhoneNumber}</Typography>
            <Typography>Address: {contact.Address}</Typography>
            <Typography>Feedback: {contact.YourFeedback}</Typography>
          </Paper>
        ))
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}



