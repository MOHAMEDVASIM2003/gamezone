import React from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import "@fontsource/metal-mania";

const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'contained', 
  color = 'primary',
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  ...props 
}) => {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      <Button
        variant={variant}
        color={color}
        fullWidth={fullWidth}
        disabled={disabled}
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
        sx={{
          fontFamily: '"Nevan RUS", sans-serif',
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '10px 24px',
          borderRadius: '8px',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: color === 'primary' ? '#FFD700' : color === 'error' ? '#FF4444' : '#6366f1',
          color: color === 'primary' ? 'black' : 'white',
          '&:hover': {
            boxShadow: `0 8px 24px ${
              color === 'primary' 
                ? 'rgba(255, 215, 0, 0.3)' 
                : color === 'error' 
                ? 'rgba(255, 68, 68, 0.3)' 
                : 'rgba(99, 102, 241, 0.3)'
            }`,
          },
          '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
          },
          ...props.sx,
        }}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
