import React, { useRef, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import "@fontsource/metal-mania";

import Arena1 from '../Assests/Arena1.png';
import Arena2 from '../Assests/Arena2.png';
import Arena3 from '../Assests/Arena3.png';
import Arena4 from '../Assests/Arena4.jpg';
import pubg from '../Assests/pubg.jpg';
import Spiderman from '../Assests/Spiderman.png';
import Modern from '../Assests/Modern.jpg';
import Fc from '../Assests/Fc.jpeg';
import F1 from '../Assests/F1.jpeg';

const images = [Arena1, Arena2, Arena3, Arena4, pubg, Spiderman, Modern, Fc, F1];

// Triple the images for smooth infinite loop
const tripleImages = [...images, ...images, ...images];

const GameArenaCarousel = () => {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const scrollSpeedRef = useRef(1); // pixels per frame
  const animationIdRef = useRef(null);

  const handleScroll = () => {
    const ref = scrollRef.current;
    if (!ref) return;

    const singleSetWidth = images.length * 268; // approximate width of one set
    
    // Reset to beginning for seamless infinite loop
    if (ref.scrollLeft >= singleSetWidth * 2) {
      ref.scrollLeft = 0;
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    const autoScroll = () => {
      if (!isHovering && ref) {
        ref.scrollLeft += scrollSpeedRef.current;

        const singleSetWidth = images.length * 268;

        // Seamless loop - reset to start when reaching end
        if (ref.scrollLeft >= singleSetWidth * 2) {
          ref.scrollLeft = 0;
        }
      }
      animationIdRef.current = requestAnimationFrame(autoScroll);
    };

    animationIdRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isHovering]);

  return (
    <Box sx={{ background: "linear-gradient(to top, #330000, #000)", color: "white", p: { xs: 2, md: 3 }, pb: 0 }}>
      <Typography
        sx={{
          fontFamily: "'Metal Mania', cursive",
          fontWeight: 400,
          fontSize: { xs: "26px", md: "35px" },
          animation: "slideInDown 0.8s ease-out",
          "@keyframes slideInDown": {
            from: { opacity: 0, transform: "translateY(-20px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        GAME ARENA
      </Typography>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "auto",
          gap: 2,
          px: 1,
          paddingTop: "20px",
          height: { xs: "200px", sm: "280px", md: "350px" },
          '&::-webkit-scrollbar': { display: 'none' },
        }}
        ref={scrollRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onScroll={handleScroll}
      >
        {tripleImages.map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            alt={`game-${index}`}
            sx={{
              minWidth: { xs: 150, sm: 200, md: 250 },
              height: { xs: 160, sm: 240, md: 300 },
              borderRadius: 2,
              objectFit: "cover",
              flexShrink: 0,
              transition: "all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)",
              cursor: "pointer",
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: `${(index % images.length) * 0.08}s`,
              "@keyframes fadeInUp": {
                from: { opacity: 0, transform: "translateY(20px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
              "&:hover": {
                transform: "scale(1.08) translateY(-5px)",
                filter: "brightness(1.15) saturate(1.2)",
                boxShadow: "0 8px 24px rgba(255, 0, 0, 0.5), inset 0 0 20px rgba(255, 100, 100, 0.3)",
                borderRadius: 3,
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default GameArenaCarousel;
