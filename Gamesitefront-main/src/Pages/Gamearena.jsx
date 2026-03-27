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

import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';
import KeyboardDoubleArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowLeftTwoTone';

const images = [Arena1, Arena2, Arena3, Arena4, pubg, Spiderman, Modern, Fc, F1];

const GameArenaCarousel = () => {
  const scrollRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const imageWidth = 252;

  const scroll = (direction) => {
    const newIndex = direction === "left" ? scrollIndex - 1 : scrollIndex + 1;
    const clampedIndex = Math.max(0, Math.min(newIndex, images.length - 1));
    setScrollIndex(clampedIndex);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: clampedIndex * imageWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    const handleScroll = () => {
      const index = Math.round(ref.scrollLeft / imageWidth);
      setScrollIndex(index);
    };
    ref.addEventListener("scroll", handleScroll);

    let isForward = true;
    const interval = setInterval(() => {
      if (!ref) return;
      const scrollAmount = isForward ? 10 : -10;
      ref.scrollLeft += scrollAmount;
      if (ref.scrollLeft <= 0) isForward = true;
      else if (ref.scrollLeft >= ref.scrollWidth - ref.clientWidth) isForward = false;
    }, 30);

    return () => {
      ref.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <Box sx={{ background: "linear-gradient(to top, #330000, #000)", color: "white", p: { xs: 2, md: 3 }, pb: 0 }}>
      <Typography
        sx={{
          fontFamily: "'Metal Mania', cursive",
          fontWeight: 400,
          fontSize: { xs: "26px", md: "35px" },
        }}
      >
        GAME ARENA
      </Typography>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: 2,
          px: 1,
          paddingTop: "20px",
          height: { xs: "200px", sm: "280px", md: "350px" },
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
              minWidth: { xs: 150, sm: 200, md: 250 },
              height: { xs: 160, sm: 240, md: 300 },
              borderRadius: 2,
              objectFit: "cover",
              flexShrink: 0,
              transition: "transform 0.3s ease, filter 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)",
                filter: "brightness(1.1)",
                boxShadow: "2px 4px 10px rgb(255, 0, 0)",
                borderRadius: 5,
              },
            }}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2, alignItems: "center", gap: 2, width: '100%' }}>
        <KeyboardDoubleArrowLeftTwoToneIcon
          onClick={() => scroll("left")}
          sx={{ color: "white", fontSize: { xs: 28, md: 40 }, cursor: "pointer", transition: "transform 0.2s", '&:hover': { transform: "scale(1.5)" } }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, md: 3 }, flexWrap: "wrap", justifyContent: "center" }}>
          {images.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => {
                setScrollIndex(idx);
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({ left: idx * imageWidth, behavior: "smooth" });
                }
              }}
              sx={{
                width: { xs: 10, md: 15 },
                height: { xs: 10, md: 15 },
                borderRadius: "50%",
                backgroundColor: idx === scrollIndex ? "white" : "gray",
                transition: "all 0.3s",
                cursor: "pointer",
                '&:hover': { backgroundColor: "#ff1744", transform: "scale(1.3)" },
              }}
            />
          ))}
        </Box>

        <KeyboardDoubleArrowRightTwoToneIcon
          onClick={() => scroll("right")}
          sx={{ color: "white", fontSize: { xs: 28, md: 40 }, cursor: "pointer", transition: "transform 0.2s", '&:hover': { transform: "scale(1.5)" } }}
        />
      </Box>
    </Box>
  );
};

export default GameArenaCarousel;
