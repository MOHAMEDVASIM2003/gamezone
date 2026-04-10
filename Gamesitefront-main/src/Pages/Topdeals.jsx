import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Deal1 from "../Assests/Deal1.png";
import Deal2 from "../Assests/Deal2.png";
import Deal3 from "../Assests/Deal3.png";
import Deal4 from "../Assests/Deal4.png";
import "@fontsource/metal-mania";

const Topdeals = () => {
  const defaultMain = {
    src: Deal1,
    title: "Latest Version\nNeed For Speed",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "black",
  };

  const [mainImage, setMainImage] = useState(defaultMain);
  const [subImages, setSubImages] = useState([
    { src: Deal2, id: 0, title: "Pokemon Go Plus", desc: "Play and enjoy with Pokemon GO Plus", color: "black" },
    { src: Deal3, id: 1, title: "Marvel Guardians of the Galaxy", desc: "Lets get into the Marvel Galaxy" },
    { src: Deal4, id: 2, title: "Resident Evil Village", desc: "Lets go the Evil Village" },
  ]);

  const handleImageClick = (index) => {
    const clicked = subImages[index];
    const updatedSubImages = [...subImages];
    updatedSubImages[index] = { src: mainImage.src, id: index, title: mainImage.title, desc: mainImage.desc };
    setMainImage({ src: clicked.src, title: clicked.title, desc: clicked.desc });
    setSubImages(updatedSubImages);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #330000, #000)",
        color: "white",
        pb: 5,
        pt: 2,
        px: { xs: 2, md: 4 },
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Metal Mania', cursive",
          fontWeight: 400,
          fontSize: { xs: "32px", md: "48px" },
          mb: 4,
        }}
      >
        Top Deals
      </Typography>

      {/* Main layout: stacks on mobile, side-by-side on desktop */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* Left: Main Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            aspectRatio: { xs: "16/9", md: "auto" },
            height: { xs: "300px", md: "650px" },
            position: "relative",
            borderRadius: 5,
            overflow: "hidden",
            transition: "transform 0.3s ease, filter 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "2px 4px 10px rgb(255, 0, 0)",
            },
          }}
        >
          <img
            src={mainImage.src}
            alt="Main"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box sx={{ position: "absolute", bottom: 20, left: 16, pr: 2 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: "22px", md: "36px" },
                whiteSpace: "pre-line",
                textTransform: "uppercase",
              }}
            >
              {mainImage.title}
            </Typography>
            {mainImage.desc && (
              <Typography sx={{ fontSize: { xs: "14px", md: "18px" }, mt: 1 }}>
                {mainImage.desc}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Right: Sub Images */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: { xs: "100%", md: "50%" },
            height: { xs: "auto", md: "650px" },
          }}
        >
          {/* Top 2 Images Side by Side */}
          <Box sx={{ display: "flex", gap: 2, flex: 1, minHeight: 0 }}>
            {[0, 1].map((idx) => (
              <Box
                key={idx}
                onClick={() => handleImageClick(idx)}
                sx={{
                  flex: 1,
                  borderRadius: 5,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "2px 4px 10px rgb(255, 0, 0)",
                  },
                }}
              >
                <img
                  src={subImages[idx]?.src}
                  alt={`Sub ${idx}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            ))}
          </Box>

          {/* Bottom Wide Image */}
          <Box
            onClick={() => handleImageClick(2)}
            sx={{
              width: "100%",
              flex: 1,
              borderRadius: 5,
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "2px 4px 10px rgb(255, 0, 0)",
              },
            }}
          >
            <img
              src={subImages[2]?.src}
              alt="Sub 2"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Topdeals;
