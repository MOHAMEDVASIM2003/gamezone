// src/components/Hero.jsx

import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import gta1 from "../Assests/gta1.jpg";
import gta2 from "../Assests/gta2.png";
import gta3 from "../Assests/gta3.png";
import "@fontsource/metal-mania";

const images = [
  { src: gta1, leftText: "PLAY ON\nYOUR\nGAME", rightText: "GRAND\nTHEFT\nAUTO V" },
  { src: gta2, leftText: "START\nYOUR\nADVENTURE", rightText: "WELCOME\nTO\nLOS SANTOS" },
  { src: gta3, leftText: "DRIVE\nLIKE A\nPRO", rightText: "STREETS\nOF\nLIBERTY" },
];

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        top: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mb: 0,
        pb: 5,
        background: "linear-gradient(to top, #330000, #000)",
      }}
    >
      {/* Search Input */}
      <TextField
        variant="outlined"
        placeholder="Search"
        sx={{
          fontFamily: "'Metal Mania',cursive",
          width: { xs: "90%", sm: "400px" },
          borderRadius: "30px",
          backgroundColor: "#1a1a1a",
          input: { color: "#fff", paddingY: 1.5 },
          fieldset: { border: "none" },
          marginTop: "20px",
          marginBottom: "10px",
        }}
        InputProps={{ sx: { pl: 2 } }}
      />

      {/* Carousel Container */}
      <Box
        sx={{
          width: "98%",
          height: { xs: "220px", sm: "350px", md: "500px", lg: "625px" },
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Swiper
          className="hero-swiper"
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          style={{ height: "100%" }}
        >
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <img
                  src={image.src}
                  alt={`slide-${idx}`}
                  style={{ position: "relative", width: "100%", height: "100%", objectFit: "cover" }}
                />

                {/* Left Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: { xs: "100px", sm: "140px", md: "180px" },
                    height: "100%",
                    background: "linear-gradient(to right, #4a0c0c, transparent)",
                    clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    pb: 4,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Metal Mania',cursive",
                      color: "white",
                      textAlign: "center",
                      whiteSpace: "pre-line",
                      fontWeight: 350,
                      fontSize: { xs: "12px", sm: "18px", md: "25px" },
                      lineHeight: { xs: "16px", sm: "22px", md: "30px" },
                      letterSpacing: 0,
                    }}
                  >
                    {image.leftText}
                  </Typography>
                </Box>

                {/* Right Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: { xs: "100px", sm: "140px", md: "180px" },
                    height: "100%",
                    background: "linear-gradient(to left, #1a0a2a, transparent)",
                    clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    pt: 4,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Metal Mania',cursive",
                      color: "white",
                      textAlign: "center",
                      whiteSpace: "pre-line",
                      px: 2,
                      fontSize: { xs: "12px", sm: "18px", md: "20px" },
                    }}
                  >
                    {image.rightText}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <style>
          {`
  .hero-swiper .swiper-pagination {
    bottom: 16px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    text-align: center !important;
  }
  .hero-swiper .swiper-pagination-bullet {
    background-color: transparent !important;
    border: 2px solid white !important;
    border-radius: 50% !important;
    width: 10px !important;
    height: 10px !important;
    opacity: 0.5 !important;
    margin: 0 4px !important;
  }
  .hero-swiper .swiper-pagination-bullet-active {
    background-color: white !important;
    opacity: 1 !important;
  }
`}
        </style>
      </Box>
    </Box>
  );
};

export default Hero;
