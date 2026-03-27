

import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import "@fontsource/metal-mania";

// Images
import apex from "../Assests/apex.png";
import cyberpunk from "../Assests/cyberpunk.png";
import spider from "../Assests/spider.png";
import odyssey from "../Assests/odyssey.png";
import witcher from "../Assests/witcher.png";
import arena1 from "../Assests/Arena1.png";
import nfs from "../Assests/nfs.jpg";
import modern from "../Assests/Modern.jpg";
import resident from "../Assests/resident.jpg";
import New1 from "../Assests/nr2.png";

// imgn1 – imgn35
import imgn1 from "../Assests/imgn1.jpg";
import imgn2 from "../Assests/imgn2.jpg";
import imgn3 from "../Assests/imgn3.jpg";
import imgn4 from "../Assests/imgn4.jpg";
import imgn5 from "../Assests/imgn5.jpg";
import imgn6 from "../Assests/imgn6.jpg";
import imgn7 from "../Assests/imgn7.jpg";
import imgn8 from "../Assests/imgn8.jpg";
import imgn9 from "../Assests/imgn9.jpg";
import imgn10 from "../Assests/imgn10.jpg";
import imgn11 from "../Assests/imgn11.jpg";
import imgn12 from "../Assests/imgn12.jpg";
import imgn13 from "../Assests/imgn13.jpg";
import imgn14 from "../Assests/imgn14.jpg";
import imgn15 from "../Assests/imgn15.jpg";
import imgn16 from "../Assests/imgn16.jpg";
import imgn17 from "../Assests/imgn17.jpg";
import imgn18 from "../Assests/imgn18.jpg";
import imgn19 from "../Assests/imgn19.jpg";
import imgn20 from "../Assests/imgn20.jpg";
import imgn21 from "../Assests/imgn21.jpg";
import imgn22 from "../Assests/imgn22.jpg";
import imgn23 from "../Assests/imgn23.jpg";
import imgn24 from "../Assests/imgn24.jpg";
import imgn25 from "../Assests/imgn25.jpg";
import imgn26 from "../Assests/imgn26.jpg";
import imgn27 from "../Assests/imgn27.jpg";
import imgn28 from "../Assests/imgn28.jpg";
import imgn29 from "../Assests/imgn29.jpg";
import imgn30 from "../Assests/imgn30.webp";
import imgn31 from "../Assests/imgn31.png";
import imgn32 from "../Assests/imgn32.png";
import imgn33 from "../Assests/imgn33.jpg";
import imgn34 from "../Assests/imgn34.jpg";
import imgn35 from "../Assests/imgn35.jpg";

// Blob animation
const blobBounce = keyframes`
  0% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
  25% { transform: translate(-100%, -100%) translate3d(100%, 0, 0); }
  50% { transform: translate(-100%, -100%) translate3d(100%, 100%, 0); }
  75% { transform: translate(-100%, -100%) translate3d(0, 100%, 0); }
  100% { transform: translate(-100%, -100%) translate3d(0, 0, 0); }
`;

const games = [
  // ── Original 10 ──────────────────────────────────────────
  { id: 1,  title: "Apex",                  category: "Action",    price: 29.99, description: "Epic space adventure",                image: apex },
  { id: 2,  title: "Cyberpunk",             category: "Racing",    price: 39.99, description: "Futuristic neon-city racing",         image: cyberpunk },
  { id: 3,  title: "SpiderVerse",           category: "Adventure", price: 19.99, description: "Teenage superhero story",             image: spider },
  { id: 4,  title: "Odyssey",              category: "Adventure", price: 24.99, description: "Survival journey across lands",        image: odyssey },
  { id: 5,  title: "Witcher",               category: "Fantasy",   price: 34.99, description: "Magical world quest",                 image: witcher },
  { id: 6,  title: "Need for Speed 2",     category: "Racing",    price: 59.99, description: "Extreme street racing",                image: nfs },
  { id: 7,  title: "God Of War",           category: "Action",    price: 39.99, description: "Battle between gods",                  image: arena1 },
  { id: 8,  title: "Star Odyssey",         category: "Sci-Fi",    price: 29.99, description: "Galactic mission",                     image: modern },
  { id: 9,  title: "Resident Evil Village", category: "Horror",    price: 39.99, description: "Survive horror in cursed village",    image: resident },
  { id: 10, title: "Assassin's Creed",     category: "Action",    price: 59.99, description: "Stealth and ancient conspiracies",     image: New1 },
  // ── Action ───────────────────────────────────────────────
  { id: 11, title: "Shadow Strike",         category: "Action",    price: 44.99, description: "A deadly assassin hunts neon cities",  image: imgn1 },
  { id: 12, title: "Battlefront Warriors",  category: "Action",    price: 49.99, description: "Squad combat across war-torn lands",   image: imgn2 },
  { id: 13, title: "Iron Fist",             category: "Action",    price: 34.99, description: "Brutal hand-to-hand combat",           image: imgn3 },
  { id: 14, title: "Hellfire Squad",        category: "Action",    price: 39.99, description: "Elite soldiers vs alien invasion",     image: imgn4 },
  { id: 15, title: "Crimson Blade",         category: "Action",    price: 29.99, description: "Samurai vengeance in feudal Japan",    image: imgn5 },
  { id: 16, title: "Thunder Strike",        category: "Action",    price: 44.99, description: "Command an armored titan in war",      image: imgn6 },
  // ── Adventure ────────────────────────────────────────────
  { id: 17, title: "Lost Kingdom",          category: "Adventure", price: 39.99, description: "Uncover secrets of a sunken city",    image: imgn7 },
  { id: 18, title: "Jungle Quest",          category: "Adventure", price: 34.99, description: "Survive wild jungles and treasure",   image: imgn8 },
  { id: 19, title: "Ancient Ruins",         category: "Adventure", price: 44.99, description: "Solve puzzles in deadly temples",     image: imgn9 },
  { id: 20, title: "Sky Pirates",           category: "Adventure", price: 29.99, description: "Aerial pirates across floating islands", image: imgn10 },
  { id: 21, title: "Desert Storm",          category: "Adventure", price: 49.99, description: "Navigate dunes to find lost gold city", image: imgn11 },
  { id: 22, title: "Ocean Depths",          category: "Adventure", price: 39.99, description: "Abyssal oceans hide monstrous secrets", image: imgn12 },
  // ── Racing ───────────────────────────────────────────────
  { id: 23, title: "Turbo Rage",            category: "Racing",    price: 54.99, description: "Hyper-speed on magnetic gravity tracks", image: imgn13 },
  { id: 24, title: "Street Racer X",        category: "Racing",    price: 44.99, description: "Underground racing with custom cars",  image: imgn14 },
  { id: 25, title: "Drift Kings",           category: "Racing",    price: 39.99, description: "Master drifting on mountain roads",    image: imgn15 },
  { id: 26, title: "Grand Prix Elite",      category: "Racing",    price: 59.99, description: "World's most prestigious race circuits", image: imgn16 },
  { id: 27, title: "Neon Rush",             category: "Racing",    price: 49.99, description: "Blaze through cyberpunk highways",     image: imgn17 },
  // ── Fantasy ──────────────────────────────────────────────
  { id: 28, title: "Dragon's Lair",         category: "Fantasy",   price: 49.99, description: "Slay dragons and claim the fire throne", image: imgn18 },
  { id: 29, title: "Elven Chronicles",      category: "Fantasy",   price: 44.99, description: "Lead elven army against dark gods",    image: imgn19 },
  { id: 30, title: "Arcane Realm",          category: "Fantasy",   price: 39.99, description: "Master powerful spells in ancient realm", image: imgn20 },
  { id: 31, title: "Mystic Forge",          category: "Fantasy",   price: 34.99, description: "Craft legendary weapons vs beasts",    image: imgn21 },
  { id: 32, title: "Shadow Wizard",         category: "Fantasy",   price: 54.99, description: "Dark sorcerer reclaims the stolen sun", image: imgn22 },
  { id: 33, title: "The Ancient Curse",     category: "Fantasy",   price: 44.99, description: "Break a curse before the world falls", image: imgn23 },
  // ── Horror ───────────────────────────────────────────────
  { id: 34, title: "Dark Descent",          category: "Horror",    price: 39.99, description: "Underground nightmare — monsters lurk", image: imgn24 },
  { id: 35, title: "Silent Shadows",        category: "Horror",    price: 44.99, description: "Town where shadows come alive at night", image: imgn25 },
  { id: 36, title: "Haunted Manor",         category: "Horror",    price: 34.99, description: "Escape before spirits claim your soul", image: imgn26 },
  { id: 37, title: "Blood Moon",            category: "Horror",    price: 49.99, description: "Werewolf apocalypse tears civilisation", image: imgn27 },
  { id: 38, title: "The Void",              category: "Horror",    price: 39.99, description: "Face an entity from beyond reality",    image: imgn28 },
  { id: 39, title: "Nightmare Protocol",    category: "Horror",    price: 44.99, description: "Scientist trapped in his own experiment", image: imgn29 },
  // ── Sci-Fi ───────────────────────────────────────────────
  { id: 40, title: "Galactic Wars",         category: "Sci-Fi",    price: 54.99, description: "Command star fleet vs galactic empire", image: imgn30 },
  { id: 41, title: "Neon Syndicate",        category: "Sci-Fi",    price: 49.99, description: "Hack megacorps in a dystopian city",    image: imgn31 },
  { id: 42, title: "Quantum Break",         category: "Sci-Fi",    price: 44.99, description: "Manipulate time to prevent collapse",   image: imgn32 },
  { id: 43, title: "Starbound",             category: "Sci-Fi",    price: 39.99, description: "Explore galaxies, colonize alien worlds", image: imgn33 },
  { id: 44, title: "Cyber Nova",            category: "Sci-Fi",    price: 54.99, description: "Rogue AI threatens to detonate the sun", image: imgn34 },
  { id: 45, title: "Orbital Strike",        category: "Sci-Fi",    price: 59.99, description: "Control orbital weapons in space war",  image: imgn35 },
];

const BATCH = 12;

const Store = ({ updateCartCount = () => {} }) => {
  const [cartIds, setCartIds] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return new Set(cart.map((item) => item.id));
  });
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const sentinelRef = useRef(null);

  useEffect(() => {
    updateCartCount(cartIds.size);
  }, [cartIds, updateCartCount]);

  // Infinite scroll observer
  useEffect(() => {
    if (visibleCount >= games.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH, games.length));
        }
      },
      { threshold: 0.1 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [visibleCount]);

  const addToCart = (game) => {
    if (cartIds.has(game.id)) return;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(game);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartIds((prev) => new Set([...prev, game.id]));
    updateCartCount(cart.length);
  };

  return (
    <Box sx={{ background: "linear-gradient(to top, #330000, #000)", minHeight: "100vh", py: 6 }}>

      {/* Title */}
      <Typography
        align="center"
        sx={{ fontFamily: "'Metal Mania', cursive", fontSize: { xs: 36, md: 55 }, color: "white", mb: 4 }}
      >
        Available Games
      </Typography>

      {/* Game Grid */}
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            pb: 6,
          }}
        >
          {games.slice(0, visibleCount).map((game, index) => {
            const inCart = cartIds.has(game.id);
            return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: { xs: "calc(50vw - 24px)", sm: 280, md: 300 },
                  minWidth: { xs: "140px" },
                  maxWidth: "300px",
                  height: { xs: "auto", md: 400 },
                  borderRadius: "14px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  boxShadow: inCart ? "4px 4px 4px 4px rgba(0,200,80,0.45)" : "4px 4px 4px 4px rgba(239,13,13,0.5)",
                  "&:hover .blob": {
                    opacity: 1,
                    animation: `${blobBounce} 5s infinite ease`,
                  },
                }}
              >
                {/* Glass layer */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 5, left: 5,
                    right: 5, bottom: 5,
                    backdropFilter: "blur(24px)",
                    borderRadius: "10px",
                    outline: "2px solid black",
                    zIndex: 2,
                  }}
                />

                {/* IN CART badge */}
                {inCart && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12, right: 12,
                      zIndex: 10,
                      backgroundColor: "#00c853",
                      color: "white",
                      fontSize: { xs: "9px", md: "11px" },
                      fontWeight: 700,
                      px: 1, py: 0.3,
                      borderRadius: "4px",
                      letterSpacing: 1,
                      boxShadow: "0 0 8px rgba(0,200,80,0.7)",
                    }}
                  >
                    ✓ IN CART
                  </Box>
                )}

                {/* Blob */}
                <Box
                  className="blob"
                  sx={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    width: 150, height: 150,
                    borderRadius: "50%",
                    backgroundColor: "#ff0000",
                    opacity: 0,
                    filter: "blur(12px)",
                    zIndex: 1,
                    pointerEvents: "none",
                    transform: "translate(-50%, -50%)",
                    transition: "opacity 0.5s ease",
                  }}
                />

                {/* Content */}
                <Box sx={{ zIndex: 3, textAlign: "center", color: "white", px: 1 }}>
                  <Box
                    component="img"
                    src={game.image}
                    alt={game.title}
                    sx={{ width: "100%", maxWidth: "280px", height: { xs: "110px", md: "150px" }, objectFit: "cover", borderRadius: "10px", mt: 1, mb: 1 }}
                  />
                  <Box sx={{ mt: 1 }}>
                    {/* Category badge */}
                    <Typography sx={{ fontSize: { xs: "9px", md: "11px" }, color: "#af40ff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, mb: 0.5 }}>
                      {game.category}
                    </Typography>
                    <Typography variant="h5" sx={{ fontSize: { xs: "14px", md: "20px" }, fontFamily: '"Nevan RUS", sans-serif', mb: 0.5 }}>
                      {game.title}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: "11px", md: "13px" }, color: "grey", mb: 0.5 }}>{game.description}</Typography>
                    <Typography variant="body2" color="white" mb={1} sx={{ fontFamily: '"Nevan RUS", sans-serif', color: "#00ddeb", fontWeight: "bold", fontSize: { xs: "13px", md: "14px" } }}>
                      ${game.price.toFixed(2)}
                    </Typography>

                    {/* Slice Button */}
                    <Box
                      onClick={() => addToCart(game)}
                      sx={{
                        px: 2, py: 1, mt: 0.5,
                        fontSize: "16px", fontWeight: 700,
                        border: inCart ? "2px solid #00c853" : "2px solid rgb(135,80,80)",
                        borderRadius: "4px",
                        position: "relative",
                        overflow: "hidden",
                        cursor: inCart ? "default" : "pointer",
                        display: "inline-block",
                        zIndex: 0,
                        backgroundColor: inCart ? "rgba(0,200,80,0.15)" : "transparent",
                        transition: "300ms cubic-bezier(0.83,0,0.17,1)",
                        "&:active": !inCart ? { transform: "scale(0.98)", filter: "brightness(0.9)" } : {},
                        "&::after": !inCart ? {
                          content: '""',
                          width: 0, height: "300%",
                          position: "absolute",
                          top: "50%", left: "50%",
                          transform: "translate(-50%,-50%) rotate(30deg)",
                          backgroundColor: "red",
                          zIndex: -1,
                          transition: "500ms cubic-bezier(0.83,0,0.17,1)",
                        } : {},
                        "&:hover": !inCart ? {
                          "& .text": { color: "#202020" },
                          "&::after": { width: "calc(120% + 1em)" },
                        } : {},
                      }}
                    >
                      <Typography
                        className="text"
                        sx={{ color: inCart ? "#00c853" : "white", transition: "color 700ms cubic-bezier(0.83,0,0.17,1)", fontSize: "15px", fontWeight: 700, fontFamily: '"Nevan RUS", sans-serif' }}
                      >
                        {inCart ? "✓ Added" : "Add to Cart"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </motion.div>
            );
          })}
        </Box>

        {/* Sentinel + loader */}
        <Box ref={sentinelRef} sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          {visibleCount < games.length ? (
            <CircularProgress size={36} sx={{ color: "red" }} />
          ) : (
            <Typography sx={{ color: "grey", fontSize: "13px", letterSpacing: 1 }}>
              All {games.length} games loaded
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Store;

