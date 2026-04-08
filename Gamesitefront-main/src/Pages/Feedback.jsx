import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

import gif1 from '../Assests/gif1.gif';
import gif2 from '../Assests/gif2.gif';
import "@fontsource/metal-mania";

const feedbacks = [
  { gif: gif2, text: '"Excellent product and top-class support throughout. Truly satisfied."' },
  { gif: gif1, text: '"Really impressive work. Met all expectations with smooth communication."' },
  { gif: gif2, text: '"Loved the responsiveness and attention to detail in the final delivery."' },
  { gif: gif1, text: '"Great collaboration! Would definitely recommend to others."' },
];

const Dot = styled(Box)(({ active }) => ({
  height: 10,
  width: 10,
  borderRadius: '50%',
  margin: '0 5px',
  backgroundColor: active ? '#fff' : '#aaa',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
}));

export default function Feedback() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate feedback every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: "linear-gradient(to top, #330000, #000)",
        color: '#fff',
        px: { xs: 2, md: 4 },
        pt: 5,
        pb: 6,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontFamily: 'Metal Mania',
          letterSpacing: 0,
          fontWeight: '400',
          fontSize: { xs: '28px', md: '40px' },
          alignSelf: 'flex-start',
        }}
      >
        FEEDBACK HIGHLIGHTS
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 3, md: 4 },
          width: '100%',
          maxWidth: '1400px',
        }}
      >
        {/* Left - GIF */}
        <Paper
          elevation={4}
          sx={{
            width: { xs: '100%', sm: '380px' },
            height: { xs: '250px', sm: '380px', md: '450px' },
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: 'transparent',
            flexShrink: 0,
          }}
        >
          <img
            src={feedbacks[activeIndex].gif}
            alt="feedback visual"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Paper>

        {/* Right - Text and Dots */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Paper
            sx={{
              px: 3,
              py: 3,
              width: '100%',
              minHeight: { xs: '120px', md: '200px' },
              borderRadius: 2,
              backgroundColor: '#ffffff25',
              textAlign: 'center',
              fontSize: { xs: '0.9rem', md: '1rem' },
              lineHeight: 1.6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            {feedbacks[activeIndex].text}
          </Paper>

          {/* Dots */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            {feedbacks.map((_, i) => (
              <Dot key={i} active={i === activeIndex} onClick={() => setActiveIndex(i)} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
