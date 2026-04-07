import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import "@fontsource/metal-mania";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const getToastStyles = (type) => {
  switch (type) {
    case 'success':
      return {
        bgColor: '#10b981',
        icon: <CheckCircleIcon sx={{ color: 'white' }} />,
      };
    case 'error':
      return {
        bgColor: '#ef4444',
        icon: <ErrorIcon sx={{ color: 'white' }} />,
      };
    case 'info':
      return {
        bgColor: '#3b82f6',
        icon: <InfoIcon sx={{ color: 'white' }} />,
      };
    default:
      return {
        bgColor: '#6366f1',
        icon: null,
      };
  }
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            removeToast={removeToast}
          />
        ))}
      </AnimatePresence>
    </Box>
  );
};

const ToastItem = ({ toast, removeToast }) => {
  const { bgColor, icon } = getToastStyles(toast.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20, x: 100 }}
      transition={{ duration: 0.3 }}
      style={{ marginBottom: 12, pointerEvents: 'auto' }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          backgroundColor: bgColor,
          color: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          minWidth: '300px',
          fontFamily: '"Nevan RUS", sans-serif',
          fontSize: '14px',
        }}
      >
        {icon}
        <Typography sx={{ flex: 1, fontSize: 'inherit' }}>
          {toast.message}
        </Typography>
        <IconButton
          size="small"
          onClick={() => removeToast(toast.id)}
          sx={{
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </motion.div>
  );
};
