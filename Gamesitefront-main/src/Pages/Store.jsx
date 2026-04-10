

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import GameCard from "../Components/GameCard";
import SearchBar from "../Components/SearchBar";
import { useToast } from "../Components/Toast";
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
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartIds, setCartIds] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return new Set(cart.map((item) => item.id));
  });
  const [wishlistIds, setWishlistIds] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return new Set(wishlist.map((item) => item.id));
  });
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const sentinelRef = useRef(null);

  // Filter games based on search query
  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) return games;
    
    const query = searchQuery.toLowerCase();
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(query) ||
        game.category.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  useEffect(() => {
    updateCartCount(cartIds.size);
  }, [cartIds, updateCartCount]);

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

  // Reset visible count when search changes
  useEffect(() => {
    setVisibleCount(BATCH);
  }, [searchQuery]);

  const addToCart = (game) => {
    if (cartIds.has(game.id)) {
      addToast(`${game.title} is already in your cart!`, 'info');
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(game);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartIds((prev) => new Set([...prev, game.id]));
    updateCartCount(cart.length);
    addToast(`${game.title} added to cart! 🛒`, 'success');
  };

  const addToWishlist = (game) => {
    const isInWishlist = wishlistIds.has(game.id);
    if (isInWishlist) {
      // Remove from wishlist
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist = wishlist.filter((item) => item.id !== game.id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlistIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(game.id);
        return newSet;
      });
      addToast(`${game.title} removed from wishlist`, 'info');
    } else {
      // Add to wishlist
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist.push(game);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlistIds((prev) => new Set([...prev, game.id]));
      addToast(`${game.title} added to wishlist! ❤️`, 'success');
    }
  };

  return (
    <Box sx={{ background: "linear-gradient(to top, #330000, #000)", minHeight: "100vh", py: 6 }}>
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography
          align="center"
          sx={{ fontFamily: "'Metal Mania', cursive", fontSize: { xs: 36, md: 55 }, color: "white", mb: 6 }}
        >
          🎮 Available Games
        </Typography>
      </motion.div>

      {/* Search Bar */}
      <Container maxWidth="xl">
        <SearchBar searchValue={searchQuery} onSearchChange={setSearchQuery} />
      </Container>

      {/* Results Info */}
      {searchQuery && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Typography
            align="center"
            sx={{
              color: "#FFD700",
              fontSize: "14px",
              mb: 3,
              letterSpacing: 1,
            }}
          >
            Found {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </Typography>
        </motion.div>
      )}

      {/* Game Grid */}
      <Container maxWidth="xl">
        {filteredGames.length === 0 ? (
          // No Results Message
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 12,
              }}
            >
              <Typography
                sx={{
                  fontSize: "48px",
                  mb: 2,
                  opacity: 0.5,
                }}
              >
                🔍
              </Typography>
              <Typography
                sx={{
                  color: "#FFD700",
                  fontSize: "24px",
                  mb: 2,
                  fontFamily: "'Metal Mania', cursive",
                }}
              >
                No Games Found
              </Typography>
              <Typography
                sx={{
                  color: "#b0b0b0",
                  fontSize: "16px",
                  textAlign: "center",
                  maxWidth: "400px",
                }}
              >
                Sorry, we couldn't find any games matching "{searchQuery}". Try searching with different keywords or explore our full catalog.
              </Typography>
            </Box>
          </motion.div>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 3,
                pb: 6,
              }}
            >
              {filteredGames.slice(0, visibleCount).map((game, index) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onAddToCart={addToCart}
                  onAddToWishlist={addToWishlist}
                  isInWishlist={wishlistIds.has(game.id)}
                  isInCart={cartIds.has(game.id)}
                />
              ))}
            </Box>

            {/* Sentinel + loader */}
            <Box ref={sentinelRef} sx={{ display: "flex", justifyContent: "center", py: 4, flexDirection: "column", alignItems: "center" }}>
              {visibleCount < filteredGames.length ? (
                <>
                  <CircularProgress size={40} sx={{ color: "#FFD700", mb: 2 }} />
                  <Typography sx={{ color: "#b0b0b0", fontSize: "14px", letterSpacing: 1 }}>
                    Loading more games...
                  </Typography>
                </>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <Typography sx={{ color: "#FFD700", fontSize: "16px", letterSpacing: 1, fontFamily: '"Metal Mania", cursive' }}>
                    ✓ All {filteredGames.length} games loaded
                  </Typography>
                </motion.div>
              )}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Store;

