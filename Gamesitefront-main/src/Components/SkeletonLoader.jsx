import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

export const SkeletonGameCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#1a1a1a',
          height: '100%',
        }}
      >
        {/* Image Skeleton */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          sx={{ backgroundColor: '#2a2a2a' }}
        />

        {/* Content Skeleton */}
        <Box sx={{ p: 2 }}>
          {/* Title */}
          <Skeleton
            variant="text"
            width="80%"
            height={24}
            sx={{ backgroundColor: '#2a2a2a', mb: 1 }}
          />

          {/* Category */}
          <Skeleton
            variant="text"
            width="60%"
            height={16}
            sx={{ backgroundColor: '#2a2a2a', mb: 2 }}
          />

          {/* Description */}
          <Skeleton
            variant="text"
            width="100%"
            height={16}
            sx={{ backgroundColor: '#2a2a2a', mb: 1 }}
          />
          <Skeleton
            variant="text"
            width="90%"
            height={16}
            sx={{ backgroundColor: '#2a2a2a', mb: 2 }}
          />

          {/* Price and Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton variant="text" width="40%" height={24} sx={{ backgroundColor: '#2a2a2a' }} />
            <Skeleton
              variant="rectangular"
              width={80}
              height={36}
              sx={{ backgroundColor: '#2a2a2a', borderRadius: '6px' }}
            />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export const SkeletonLoader = ({ count = 6 }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 3,
        width: '100%',
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonGameCard key={index} />
      ))}
    </Box>
  );
};
