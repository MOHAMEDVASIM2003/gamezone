import React, { useRef, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import img1 from '../Assests/img1.jpg';
import img2 from '../Assests/img2.jpg';
import img3 from '../Assests/img3.jpg';
import img4 from '../Assests/img4.jpeg';
import img5 from '../Assests/img5.jpeg';

const images = [img1, img2, img3, img4, img5];

// Triple images for infinite loop
const tripleImages = [...images, ...images, ...images];

const Toprating = () => {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const scrollSpeedRef = useRef(1);
  const animationIdRef = useRef(null);

  const handleScroll = () => {
    const ref = scrollRef.current;
    if (!ref) return;

    const singleSetWidth = images.length * 354;

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

        const singleSetWidth = images.length * 354;

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
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(to bottom, #330000, #000)",
        py: 4,
        color: "white",
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Metal Mania",
          fontWeight: 400,
          fontSize: { xs: "26px", md: "35px" },
          ml: { xs: 2, md: "30px" },
          mb: 1,
          animation: "slideInDown 0.8s ease-out",
          "@keyframes slideInDown": {
            from: { opacity: 0, transform: "translateY(-20px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        TOP RATING
      </Typography>

      {/* Scrollable image container */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "auto",
          gap: 2,
          px: 2,
          paddingTop: "20px",
          height: { xs: "200px", sm: "280px", md: "370px" },
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
              minWidth: { xs: 160, sm: 250, md: 340 },
              height: { xs: 170, sm: 250, md: 350 },
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
                transform: "scale(1.08) translateY(-8px)",
                filter: "brightness(1.2) saturate(1.3)",
                boxShadow: "0 12px 32px rgba(255, 0, 0, 0.6), inset 0 0 25px rgba(255, 100, 100, 0.4)",
                borderRadius: 3,
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Toprating;
