import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import "@fontsource/metal-mania";

// Original Assets
import apex from "../Assests/apex.png";
import cyberpunk from "../Assests/cyberpunk.png";
import spider from "../Assests/spider.png";
import odyssey from "../Assests/odyssey.png";
import witcher from "../Assests/witcher.png";
import arena1 from "../Assests/Arena1.png";
import nfs from "../Assests/nfs.jpg";
import modern from "../Assests/Modern.jpg";
import resident from "../Assests/resident.jpg";
import New1 from "../Assests/New2.png";

// New Assets imgn1 - imgn35
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

const games = [
  { id: 1, title: "Apex", category: "Action", price: 29.99, description: "An epic space adventure with stunning visuals.", image: apex },
  { id: 2, title: "Cyberpunk", category: "Racing", price: 39.99, description: "Fast-paced car racing game.", image: cyberpunk },
  { id: 3, title: "SpiderVerse", category: "Adventure", price: 19.99, description: "Adventures of Teenage SuperHero.", image: spider },
  { id: 4, title: "Odyssey", category: "Adventure", price: 24.99, description: "Survival of the fittest.", image: odyssey },
  { id: 5, title: "Witcher", category: "Fantasy", price: 34.99, description: "A magical journey through enchanted lands.", image: witcher },
  { id: 6, title: "Need for Speed 2", category: "Racing", price: 59.99, description: "An adventure car racing game.", image: nfs },
  { id: 7, title: "God Of War", category: "Action", price: 39.99, description: "Battle between gods.", image: arena1 },
  { id: 8, title: "Star Odyssey", category: "Sci-Fi", price: 29.99, description: "An epic space adventure with stunning visuals.", image: modern },
  { id: 9, title: "Resident Evil Village", category: "Horror", price: 39.99, description: "Evil village survival.", image: resident },
  { id: 10, title: "Assassins Creed", category: "Action", price: 59.99, description: "Stealth, parkour and ancient conspiracies.", image: New1 },
  { id: 11, title: "Shadow Strike", category: "Action", price: 44.99, description: "A deadly assassin hunts through neon-lit cities.", image: imgn1 },
  { id: 12, title: "Battlefront Warriors", category: "Action", price: 49.99, description: "Squad-based combat across war-torn continents.", image: imgn2 },
  { id: 13, title: "Iron Fist", category: "Action", price: 34.99, description: "Hand-to-hand combat with brutal finishing moves.", image: imgn3 },
  { id: 14, title: "Hellfire Squad", category: "Action", price: 39.99, description: "Elite soldiers face an unstoppable alien force.", image: imgn4 },
  { id: 15, title: "Crimson Blade", category: "Action", price: 29.99, description: "A lone samurai seeks vengeance across feudal Japan.", image: imgn5 },
  { id: 16, title: "Thunder Strike", category: "Action", price: 44.99, description: "Command an armored titan through warzone missions.", image: imgn6 },
  { id: 17, title: "Lost Kingdom", category: "Adventure", price: 39.99, description: "Uncover the secrets of an ancient sunken civilization.", image: imgn7 },
  { id: 18, title: "Jungle Quest", category: "Adventure", price: 34.99, description: "Survive wild jungles full of traps and treasure.", image: imgn8 },
  { id: 19, title: "Ancient Ruins", category: "Adventure", price: 44.99, description: "Solve puzzles inside deadly forgotten temples.", image: imgn9 },
  { id: 20, title: "Sky Pirates", category: "Adventure", price: 29.99, description: "Lead a crew of aerial pirates across floating islands.", image: imgn10 },
  { id: 21, title: "Desert Storm", category: "Adventure", price: 49.99, description: "Navigate treacherous dunes to find a lost city of gold.", image: imgn11 },
  { id: 22, title: "Ocean Depths", category: "Adventure", price: 39.99, description: "Dive into abyssal oceans hiding monstrous secrets.", image: imgn12 },
  { id: 23, title: "Turbo Rage", category: "Racing", price: 54.99, description: "Hyper-speed racing on magnetic gravity tracks.", image: imgn13 },
  { id: 24, title: "Street Racer X", category: "Racing", price: 44.99, description: "Underground street racing with full car customization.", image: imgn14 },
  { id: 25, title: "Drift Kings", category: "Racing", price: 39.99, description: "Master the art of drifting on impossible mountain roads.", image: imgn15 },
  { id: 26, title: "Grand Prix Elite", category: "Racing", price: 59.99, description: "Compete in the world's most prestigious racing circuits.", image: imgn16 },
  { id: 27, title: "Neon Rush", category: "Racing", price: 49.99, description: "Blaze through glowing cyberpunk highways at light speed.", image: imgn17 },
  { id: 28, title: "Dragon's Lair", category: "Fantasy", price: 49.99, description: "Slay dragons and claim the throne of the fire realm.", image: imgn18 },
  { id: 29, title: "Elven Chronicles", category: "Fantasy", price: 44.99, description: "Lead the elven army against an army of dark gods.", image: imgn19 },
  { id: 30, title: "Arcane Realm", category: "Fantasy", price: 39.99, description: "Master powerful spells in a world of ancient magic.", image: imgn20 },
  { id: 31, title: "Mystic Forge", category: "Fantasy", price: 34.99, description: "Craft legendary weapons to battle mythical beasts.", image: imgn21 },
  { id: 32, title: "Shadow Wizard", category: "Fantasy", price: 54.99, description: "A dark sorcerer fights to reclaim the stolen sun.", image: imgn22 },
  { id: 33, title: "The Ancient Curse", category: "Fantasy", price: 44.99, description: "Break an immortal curse before the world falls to darkness.", image: imgn23 },
  { id: 34, title: "Dark Descent", category: "Horror", price: 39.99, description: "Descend into a nightmare underground where monsters lurk.", image: imgn24 },
  { id: 35, title: "Silent Shadows", category: "Horror", price: 44.99, description: "Survive a town where shadows come alive after dark.", image: imgn25 },
  { id: 36, title: "Haunted Manor", category: "Horror", price: 34.99, description: "Escape a cursed mansion before the spirits claim your soul.", image: imgn26 },
  { id: 37, title: "Blood Moon", category: "Horror", price: 49.99, description: "A werewolf apocalypse tears civilization apart.", image: imgn27 },
  { id: 38, title: "The Void", category: "Horror", price: 39.99, description: "Face an incomprehensible entity from beyond reality.", image: imgn28 },
  { id: 39, title: "Nightmare Protocol", category: "Horror", price: 44.99, description: "A scientist trapped in his own experiment turned deadly.", image: imgn29 },
  { id: 40, title: "Galactic Wars", category: "Sci-Fi", price: 54.99, description: "Command a star fleet against an intergalactic empire.", image: imgn30 },
  { id: 41, title: "Neon Syndicate", category: "Sci-Fi", price: 49.99, description: "Hack megacorporations in a dystopian cyberpunk city.", image: imgn31 },
  { id: 42, title: "Quantum Break", category: "Sci-Fi", price: 44.99, description: "Manipulate time itself to prevent a catastrophic collapse.", image: imgn32 },
  { id: 43, title: "Starbound", category: "Sci-Fi", price: 39.99, description: "Explore uncharted galaxies and colonize alien worlds.", image: imgn33 },
  { id: 44, title: "Cyber Nova", category: "Sci-Fi", price: 54.99, description: "A rogue AI threatens to detonate the sun — stop it.", image: imgn34 },
  { id: 45, title: "Orbital Strike", category: "Sci-Fi", price: 59.99, description: "Control orbital weapons in a high-stakes space war.", image: imgn35 },
];

const categories = ["All", "Action", "Adventure", "Racing", "Fantasy", "Horror", "Sci-Fi"];

const GradientButton = ({ children, onClick, selected }) => (
  <Box
    component="button"
    onClick={onClick}
    sx={{
      alignItems: "center",
      backgroundImage: "linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb)",
      border: 0,
      borderRadius: "8px",
      boxShadow: "rgba(151, 65, 252, 0.2) 0 15px 30px -5px",
      color: "#ffffff",
      display: "flex",
      fontSize: { xs: "14px", md: "18px" },
      justifyContent: "center",
      minWidth: { xs: "80px", md: "120px" },
      padding: "3px",
      cursor: "pointer",
      transition: "all 0.3s",
      transform: selected ? "scale(1.05)" : "scale(1)",
      "&:active": { transform: "scale(0.9)" },
    }}
  >
    <Box
      component="span"
      sx={{
        backgroundColor: selected ? "transparent" : "rgb(5, 6, 45)",
        padding: { xs: "8px 12px", md: "12px 20px" },
        borderRadius: "6px",
        width: "100%",
        height: "100%",
        transition: "300ms",
        textAlign: "center",
      }}
    >
      {children}
    </Box>
  </Box>
);

const BATCH = 12;

const Categories = ({ updateCartCount }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartIds, setCartIds] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return new Set(cart.map((item) => item.id));
  });
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const sentinelRef = useRef(null);

  const filteredGames =
    selectedCategory === "All" ? games : games.filter((game) => game.category === selectedCategory);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(BATCH);
  }, [selectedCategory]);

  // Infinite scroll observer
  useEffect(() => {
    if (visibleCount >= filteredGames.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH, filteredGames.length));
        }
      },
      { threshold: 0.1 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [visibleCount, filteredGames.length]);

  const addToCart = (game) => {
    if (cartIds.has(game.id)) return;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(game);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartIds((prev) => new Set([...prev, game.id]));
    if (updateCartCount) updateCartCount(cart.length);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to top, #330000, #000)",
        minHeight: "100vh",
        color: "white",
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      <Typography
        align="center"
        sx={{ fontFamily: "'Metal Mania', cursive", fontSize: { xs: "32px", md: "50px" }, mb: 4 }}
      >
        Game Categories
      </Typography>

      {/* Category Filter Buttons */}
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={{ xs: 1, md: 2 }} mb={4}>
        {categories.map((cat) => (
          <GradientButton key={cat} onClick={() => setSelectedCategory(cat)} selected={selectedCategory === cat}>
            {cat}
          </GradientButton>
        ))}
      </Box>

      {/* Game Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 2, md: 3 },
          justifyContent: "center",
          py: 3,
          px: 1,
        }}
      >
        {filteredGames.slice(0, visibleCount).map((game) => {
          const inCart = cartIds.has(game.id);
          return (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card
              sx={{
                width: { xs: "calc(50vw - 24px)", sm: 260, md: 280 },
                minWidth: { xs: "140px" },
                maxWidth: "280px",
                height: { xs: "auto", md: 420 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "linear-gradient(to bottom, #1a0000, #000)",
                color: "white",
                borderRadius: "12px",
                overflow: "hidden",
                "&:hover": { boxShadow: inCart ? "0 0 20px rgba(0,200,80,0.5)" : "0 0 20px rgb(98, 1, 1)" },
              }}
            >
              {/* Image with IN CART badge */}
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={game.image}
                  alt={game.title}
                  sx={{ objectFit: "cover" }}
                />
                {inCart && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8, right: 8,
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
              </Box>
              <CardContent sx={{ flexGrow: 1, pb: 0, px: { xs: 1.5, md: 2 } }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5, fontSize: { xs: "14px", md: "18px" } }}>
                  {game.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#af40ff", fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", display: "block", mb: 0.5, fontSize: { xs: "10px", md: "12px" } }}
                >
                  {game.category}
                </Typography>
                <Typography variant="body2" color="gray" sx={{ fontSize: { xs: "11px", md: "13px" } }}>
                  {game.description}
                </Typography>
                <Typography variant="body1" sx={{ color: "#00ddeb", fontWeight: "bold", mt: 1, fontSize: { xs: "14px", md: "16px" } }}>
                  ${game.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button
                  variant="contained"
                  size="small"
                  disableElevation={inCart}
                  sx={{
                    backgroundColor: inCart ? "#00c853" : "red",
                    color: "white",
                    borderRadius: "8px",
                    fontSize: { xs: "11px", md: "14px" },
                    cursor: inCart ? "default" : "pointer",
                    "&:hover": inCart
                      ? { backgroundColor: "#00c853" }
                      : { backgroundColor: "#cc0000", transform: "scale(1.05)" },
                  }}
                  onClick={() => addToCart(game)}
                >
                  {inCart ? "✓ Added" : "Add to Cart"}
                </Button>
              </CardActions>
            </Card>
          </motion.div>
          );
        })}
      </Box>

      {/* Sentinel + loader */}
      <Box ref={sentinelRef} sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        {visibleCount < filteredGames.length ? (
          <CircularProgress size={36} sx={{ color: "red" }} />
        ) : (
          <Typography sx={{ color: "grey", fontSize: "13px", letterSpacing: 1 }}>
            All {filteredGames.length} games loaded
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Categories;
