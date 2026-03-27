import { Box, Typography } from "@mui/material";
import React from "react";
import New1 from "../Assests/New1.png";
import nr2 from "../Assests/nr2.png";
import nr3 from "../Assests/nr3.png";
import nr4 from "../Assests/nr4.png";
import nr5 from "../Assests/pubg.jpg";
import "@fontsource/metal-mania";

function Newrelease() {
  return (
    <Box
      sx={{
        background: "linear-gradient(to top, #330000, #000)",
        color: "white",
        p: { xs: 2, md: 3 },
        pb: 5,
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Metal Mania', cursive",
          fontWeight: 400,
          fontSize: { xs: "32px", md: "48px" },
          mb: 4,
          ml: { xs: 0, md: 3 },
        }}
      >
        New Release
      </Typography>

      {/* Mobile: single column stack. Desktop: left image + right column */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          px: { xs: 0, md: 2 },
        }}
      >
        {/* Left: Tall main image */}
        <Box
          sx={{
            width: { xs: "100%", md: "48%" },
            borderRadius: 2,
            overflow: "hidden",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "2px 5px 10px rgb(255, 0, 0)",
              borderRadius: 5,
            },
          }}
        >
          <img
            src={New1}
            alt="New1"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </Box>

        {/* Right: stacked images + text */}
        <Box
          sx={{
            width: { xs: "100%", md: "48%" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Image 2 */}
          <Box
            sx={{
              width: "100%",
              aspectRatio: "16/9",
              borderRadius: 2,
              overflow: "hidden",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "5px 5px 10px rgb(255, 0, 0)",
                borderRadius: 5,
              },
            }}
          >
            <img src={nr2} alt="nr2" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </Box>

          {/* Text */}
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: { xs: "24px", sm: "36px", md: "44px" },
              lineHeight: { xs: "32px", md: "56px" },
              textTransform: "uppercase",
            }}
          >
            WE ARE HERE TO YOU
          </Typography>

          {/* Image 3 */}
          <Box
            sx={{
              width: "100%",
              aspectRatio: "16/7",
              borderRadius: 2,
              overflow: "hidden",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "5px 5px 10px rgb(255, 0, 0)",
                borderRadius: 5,
              },
            }}
          >
            <img src={nr3} alt="nr3" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </Box>

          {/* Image 4 */}
          <Box
            sx={{
              width: "100%",
              aspectRatio: "16/7",
              borderRadius: 2,
              overflow: "hidden",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "5px 5px 10px rgb(255, 0, 0)",
                borderRadius: 5,
              },
            }}
          >
            <img src={nr4} alt="nr4" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </Box>

          {/* Image 5 */}
          <Box
            sx={{
              width: "100%",
              aspectRatio: "16/9",
              borderRadius: 2,
              overflow: "hidden",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "5px 5px 10px rgb(255, 0, 0)",
                borderRadius: 5,
              },
            }}
          >
            <img src={nr5} alt="PUBG" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Newrelease;
