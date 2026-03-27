import React, { useRef, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

import img1 from '../Assests/img1.jpg';
import img2 from '../Assests/img2.jpg';
import img3 from '../Assests/img3.jpg';
import img4 from '../Assests/img4.jpeg';
import img5 from '../Assests/img5.jpeg';

const images = [img1, img2, img3, img4, img5];

const Toprating = () => {
  const scrollRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    let direction = 5;
    const interval = setInterval(() => {
      if (!ref) return;
      ref.scrollLeft += direction * 1.5;
      if (ref.scrollLeft <= 0) direction = 1;
      else if (ref.scrollLeft >= ref.scrollWidth - ref.clientWidth) direction = -1;
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const scrollToIndex = (index) => {
    const { current } = scrollRef;
    if (!current) return;
    const imageBoxes = current.querySelectorAll("img");
    const target = imageBoxes[index];
    if (target) {
      const left = target.offsetLeft - current.offsetLeft;
      current.scrollTo({ left, behavior: "smooth" });
      setScrollIndex(index);
    }
  };

  const scroll = (direction) => {
    const maxIndex = images.length - 1;
    let nextIndex = direction === "left" ? scrollIndex - 1 : scrollIndex + 1;
    nextIndex = Math.max(0, Math.min(nextIndex, maxIndex));
    scrollToIndex(nextIndex);
  };

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
        }}
      >
        TOP RATING
      </Typography>

      {/* Scrollable image container */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: 2,
          px: 2,
          paddingTop: "20px",
          height: { xs: "200px", sm: "280px", md: "370px" },
          '&::-webkit-scrollbar': { display: 'none' },
        }}
        ref={scrollRef}
      >
        {images.map((src, index) => (
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
              transition: "transform 0.3s ease, filter 0.3s ease",
              "&:hover": { transform: "scale(1.05)", filter: "brightness(1.1)" },
            }}
          />
        ))}
      </Box>

      {/* Navigation */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, alignItems: "center", gap: 2 }}>
        <Box
          onClick={() => scroll("left")}
          sx={{
            width: { xs: 38, md: 50 },
            height: { xs: 38, md: 50 },
            borderRadius: "50%",
            backgroundColor: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "2px solid white",
            transition: "transform 0.3s ease, background-color 0.3s ease",
            "&:hover": { transform: "scale(1.1)", backgroundColor: "#333" },
          }}
        >
          <ArrowBackOutlinedIcon sx={{ color: "white", fontSize: { xs: 20, md: 28 } }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, md: 3 } }}>
          {images.map((_, idx) => (
            <Box
              key={idx}
              onMouseEnter={() => scrollToIndex(idx)}
              onClick={() => scrollToIndex(idx)}
              sx={{
                width: { xs: 10, md: 12 },
                height: { xs: 10, md: 12 },
                borderRadius: "50%",
                backgroundColor: idx === scrollIndex ? "white" : "gray",
                transition: "background-color 0.3s",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>

        <Box
          onClick={() => scroll("right")}
          sx={{
            width: { xs: 38, md: 50 },
            height: { xs: 38, md: 50 },
            borderRadius: "50%",
            backgroundColor: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "2px solid white",
            transition: "transform 0.3s ease, background-color 0.3s ease",
            "&:hover": { transform: "scale(1.1)", backgroundColor: "#333" },
          }}
        >
          <ArrowForwardOutlinedIcon sx={{ color: "white", fontSize: { xs: 20, md: 28 } }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Toprating;
