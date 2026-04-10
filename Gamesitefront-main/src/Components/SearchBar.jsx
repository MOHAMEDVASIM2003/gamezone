import React from "react";
import { Box, TextField, InputAdornment, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { motion } from "framer-motion";

const SearchBar = ({ searchValue, onSearchChange, isSearching = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
          px: { xs: 2, md: 0 },
        }}
      >
        <TextField
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search games by title, category, or description..."
          variant="outlined"
          fullWidth
          sx={{
            maxWidth: "600px",
            "& .MuiOutlinedInput-root": {
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "8px",
              border: "2px solid rgba(255, 215, 0, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 215, 0, 0.6)",
              },
              "&.Mui-focused": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "#FFD700",
                boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "rgba(255, 255, 255, 0.5)",
              opacity: 1,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {isSearching ? (
                  <CircularProgress size={24} sx={{ color: "#FFD700", mr: 1 }} />
                ) : (
                  <SearchIcon sx={{ color: "#FFD700", mr: 1 }} />
                )}
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <InputAdornment position="end">
                <ClearIcon
                  onClick={() => onSearchChange("")}
                  sx={{
                    color: "#FFD700",
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": { opacity: 0.7 },
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </motion.div>
  );
};

export default SearchBar;
