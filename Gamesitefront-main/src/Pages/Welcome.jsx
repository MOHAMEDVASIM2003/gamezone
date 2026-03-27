// src/components/Welcome.jsx

import React from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import img1 from "../Assests/gta1.jpg";
import img2 from "../Assests/gta2.png";
import img3 from "../Assests/gta3.png";
import "@fontsource/metal-mania";

const slides = [
  {
    title: "WELCOME TO\nTHE GAME ZONE\nARENA",
    description:
      "Lorem ipsum dolor sit amet consectetur. Urna consequat morbi semper in etiam leo tempus non neque. Eget scelerisque fringilla aliquet aenean. In eget sit eget elementum adipiscing rhoncus.",
    image: img1,
  },
  {
    title: "DISCOVER\nNEW BATTLES\nEVERYDAY",
    description:
      "Join the fight and uncover the secrets hidden in the depths of the zone. Action-packed moments await with every click.",
    image: img2,
  },
  {
    title: "LEVEL UP\nYOUR JOURNEY\nNOW",
    description:
      "Experience immersive gameplay and stunning visuals that transport you straight into the gaming world.",
    image: img3,
  },
];

const Welcome = () => {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #330000, #000)",
        pt: 4,
        pb: 6,
        position: "relative",
      }}
    >
      <Swiper
        className="welcome-swiper"
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        style={{ paddingBottom: "40px" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                color: "white",
                px: { xs: 3, md: 5 },
                gap: { xs: 3, md: 4 },
              }}
            >
              {/* Left Content */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: { md: "590px" },
                  order: { xs: 2, md: 1 },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "'Metal Mania',cursive",
                    whiteSpace: "pre-line",
                    fontWeight: "400",
                    fontSize: { xs: "32px", sm: "44px", md: "64px" },
                    mb: { xs: 2, md: 6 },
                    lineHeight: { xs: "38px", sm: "52px", md: "70px" },
                    letterSpacing: "0%",
                  }}
                >
                  {slide.title}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", md: "1.1rem" } }}>
                  {slide.description}
                </Typography>
              </Box>

              {/* Right Image */}
              <Box
                component="img"
                src={slide.image}
                alt={`Slide ${index}`}
                sx={{
                  flex: 1,
                  width: "100%",
                  maxWidth: { xs: "100%", md: "709px" },
                  height: { xs: "200px", sm: "300px", md: "460px" },
                  objectFit: "cover",
                  borderRadius: "20px",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                  order: { xs: 1, md: 2 },
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>
        {`
          .welcome-swiper .swiper-pagination {
            bottom: 8px !important;
            left: 40px !important;
            text-align: left !important;
          }
          .welcome-swiper .swiper-pagination-bullet {
            background-color: white !important;
            opacity: 0.5;
            margin: 0 6px !important;
          }
          .welcome-swiper .swiper-pagination-bullet-active {
            opacity: 1 !important;
          }
        `}
      </style>
    </Box>
  );
};

export default Welcome;
