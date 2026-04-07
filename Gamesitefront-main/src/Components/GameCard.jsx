import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "@fontsource/metal-mania";

const GameCard = ({ game, onAddToCart, onAddToWishlist, isInWishlist = false, isInCart = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [wishlistHovered, setWishlistHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          borderRadius: '14px',
          overflow: 'hidden',
          backgroundColor: isInCart ? '#1a2a1a' : '#1a1a1a',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: isInCart
            ? '0 0 24px rgba(0, 200, 83, 0.4)'
            : isHovered
            ? '0 20px 40px rgba(255, 215, 0, 0.2)'
            : '0 8px 16px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: isInCart
            ? '2px solid rgba(0, 200, 83, 0.6)'
            : isHovered
            ? '1px solid rgba(255, 215, 0, 0.3)'
            : '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          cursor: isInCart ? 'default' : 'pointer',
        }}
      >
        {/* Image Container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 200,
            overflow: 'hidden',
          }}
        >
          <motion.img
            src={game.image}
            alt={game.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Overlay on Hover */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            pointerEvents={isHovered ? 'none' : 'none'}
          />

          {/* Badge */}
          <motion.div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: '#FFD700',
              color: 'black',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              fontFamily: '"Nevan RUS", sans-serif',
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            ${game.price}
          </motion.div>

          {/* In Cart Indicator */}
          {isInCart && (
            <motion.div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                backgroundColor: '#00C853',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                boxShadow: '0 0 16px rgba(0, 200, 83, 0.6)',
              }}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            >
              <CheckCircleIcon
                sx={{
                  fontSize: '24px',
                  color: 'white',
                }}
              />
            </motion.div>
          )}

          {/* Wishlist Button */}
          <motion.div
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
            }}
            animate={{
              scale: wishlistHovered ? 1.2 : 1,
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onAddToWishlist(game);
              }}
              onMouseEnter={() => setWishlistHovered(true)}
              onMouseLeave={() => setWishlistHovered(false)}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: isInWishlist ? '#FFD700' : 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 215, 0, 0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {isInWishlist ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
          </motion.div>
        </Box>

        {/* Content */}
        <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Title */}
          <Typography
            sx={{
              fontFamily: '"Metal Mania", cursive',
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'white',
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {game.title}
          </Typography>

          {/* Category */}
          <Typography
            sx={{
              fontFamily: '"Nevan RUS", sans-serif',
              fontSize: '12px',
              color: '#FFD700',
              mb: 1,
              fontWeight: '500',
              textTransform: 'uppercase',
            }}
          >
            {game.category}
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              fontFamily: '"Nevan RUS", sans-serif',
              fontSize: '13px',
              color: '#b0b0b0',
              mb: 2,
              flex: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {game.description}
          </Typography>

          {/* Add to Cart Button */}
          <motion.div
            whileHover={isInCart ? {} : { scale: 1.05 }}
            whileTap={isInCart ? {} : { scale: 0.95 }}
          >
            <Button
              fullWidth
              onClick={() => !isInCart && onAddToCart(game)}
              startIcon={isInCart ? <CheckCircleIcon /> : <ShoppingCartIcon />}
              disabled={isInCart}
              sx={{
                backgroundColor: isInCart ? '#00C853' : '#FFD700',
                color: isInCart ? 'white' : 'black',
                fontFamily: '"Nevan RUS", sans-serif',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '8px 16px',
                borderRadius: '8px',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                cursor: isInCart ? 'default' : 'pointer',
                '&:hover': isInCart
                  ? {
                      backgroundColor: '#00C853',
                      boxShadow: '0 8px 16px rgba(0, 200, 83, 0.3)',
                    }
                  : {
                      backgroundColor: '#FFC700',
                      boxShadow: '0 8px 16px rgba(255, 215, 0, 0.3)',
                    },
                '&:disabled': {
                  backgroundColor: '#00C853',
                  color: 'white',
                  opacity: 1,
                },
              }}
            >
              {isInCart ? '✓ In Cart' : 'Add to Cart'}
            </Button>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default GameCard;
