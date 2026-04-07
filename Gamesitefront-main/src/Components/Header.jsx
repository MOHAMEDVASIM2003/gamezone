import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import loginicon from '../Assests/loginicon.svg';
import carticon from '../Assests/carticon.svg';
import subtract from '../Assests/Subtract.svg';
import "@fontsource/metal-mania";

const navLinks = [
  { label: 'HOME', path: '/' },
  { label: 'STORE', path: '/store' },
  { label: 'CATEGORIES', path: '/categories' },
  { label: 'NEW RELEASE', path: '/newrelease' },
  { label: 'TOP TRENDING', path: '/toptrending' },
  { label: 'SUPPORT', path: '/support' },
];

function Header({ cartCount }) {
  const [signedUser, setSignedUser] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [prevCartCount, setPrevCartCount] = useState(cartCount);
  const [showCartPulse, setShowCartPulse] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('signedUpUsername');
    if (storedUser) setSignedUser(storedUser);
  }, []);

  // Trigger pulse animation when cart count increases
  useEffect(() => {
    if (cartCount > prevCartCount) {
      setShowCartPulse(true);
      const timer = setTimeout(() => setShowCartPulse(false), 600);
      return () => clearTimeout(timer);
    }
    setPrevCartCount(cartCount);
  }, [cartCount, prevCartCount]);

  return (
    <Box sx={{ 
      backgroundColor: 'black', 
      color: '#FFFFFF', 
      px: { xs: 2, md: 4 }, 
      py: 2, 
      position: 'sticky', 
      top: 0, 
      zIndex: 1100,
      borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
      backdropFilter: 'blur(10px)',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography
            variant="h6"
            sx={{ 
              fontFamily: '"Metal Mania", cursive', 
              fontWeight: 600, 
              fontSize: { xs: '18px', md: '24px' }, 
              color: '#FFD700',
              letterSpacing: 1,
            }}
          >
            GAME VAULT
          </Typography>
        </motion.div>

        {/* Desktop Nav */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div key={link.path} whileHover={{ y: -2 }}>
                <Button 
                  component={Link} 
                  to={link.path}
                  sx={{
                    color: isActive ? '#FFD700' : 'white',
                    fontFamily: '"Nevan RUS", sans-serif',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    borderBottom: isActive ? '2px solid #FFD700' : '2px solid transparent',
                    borderRadius: 0,
                    pb: '2px',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      color: '#FFD700', 
                      borderBottom: '2px solid #FFD700',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {link.label}
                </Button>
              </motion.div>
            );
          })}
        </Box>

        {/* Desktop Icons */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button 
              component={Link} 
              to="/cart"
              sx={{
                position: 'relative',
                minWidth: 0,
                p: 0.5,
                '&:hover': { background: 'rgba(255, 215, 0, 0.1)' },
                borderRadius: '8px',
                transition: 'all 0.3s ease',
              }}
            >
              <img src={carticon} alt="Cart" style={{ width: 28, height: 28 }} />
              {cartCount > 0 && (
                <motion.div
                  animate={showCartPulse ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -5,
                      right: -5,
                      backgroundColor: '#FF4444',
                      color: 'white',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      boxShadow: '0 0 12px rgba(255, 68, 68, 0.6)',
                    }}
                  >
                    {cartCount}
                  </Box>
                </motion.div>
              )}
            </Button>
          </motion.div>

          <Box sx={{ textAlign: 'center' }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                component={Link} 
                to="/sign"
                sx={{
                  minWidth: 0,
                  p: 0.5,
                  '&:hover': { background: 'rgba(255, 215, 0, 0.1)' },
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                }}
              >
                <img src={subtract} alt="Profile" style={{ width: 24, height: 24 }} />
              </Button>
            </motion.div>
            {signedUser && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontSize: '11px', 
                    color: '#FFD700', 
                    display: 'block', 
                    mt: '2px',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  {signedUser}
                </Typography>
              </motion.div>
            )}
          </Box>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button 
              component={Link} 
              to="/logout"
              sx={{
                minWidth: 0,
                p: 0.5,
                '&:hover': { background: 'rgba(255, 68, 68, 0.1)' },
                borderRadius: '8px',
                transition: 'all 0.3s ease',
              }}
            >
              <img src={loginicon} alt="Logout" style={{ width: 24, height: 24 }} />
            </Button>
          </motion.div>
        </Box>

        {/* Mobile: cart icon + hamburger */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button 
              component={Link} 
              to="/cart" 
              sx={{ 
                minWidth: 0, 
                p: 0.5,
                position: 'relative',
              }}
            >
              <img src={carticon} alt="Cart" style={{ width: 26, height: 26 }} />
              {cartCount > 0 && (
                <motion.div
                  animate={showCartPulse ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -5,
                      right: -5,
                      backgroundColor: '#FF4444',
                      color: 'white',
                      borderRadius: '50%',
                      width: 18,
                      height: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      boxShadow: '0 0 12px rgba(255, 68, 68, 0.6)',
                    }}
                  >
                    {cartCount}
                  </Box>
                </motion.div>
              )}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton 
              onClick={() => setDrawerOpen(true)} 
              sx={{ 
                color: 'white',
                '&:hover': { background: 'rgba(255, 215, 0, 0.1)' },
              }}
            >
              <MenuIcon />
            </IconButton>
          </motion.div>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: drawerOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ 
            sx: { 
              backgroundColor: '#1a1a1a', 
              color: 'white', 
              width: 230,
              borderLeft: '1px solid rgba(255, 215, 0, 0.2)',
            } 
          }}
        >
          <List>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <ListItem key={link.path} disablePadding>
                  <ListItemButton
                    component={Link} 
                    to={link.path}
                    onClick={() => setDrawerOpen(false)}
                    sx={{ 
                      borderLeft: isActive ? '3px solid #FFD700' : '3px solid transparent', 
                      backgroundColor: isActive ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 215, 0, 0.15)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{ 
                        sx: { 
                          fontFamily: '"Nevan RUS", sans-serif', 
                          color: isActive ? '#FFD700' : 'white', 
                          fontSize: '14px', 
                          fontWeight: isActive ? 700 : 400 
                        } 
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                to="/sign" 
                onClick={() => setDrawerOpen(false)}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': { backgroundColor: 'rgba(255, 215, 0, 0.1)' },
                }}
              >
                <ListItemText
                  primary="PROFILE"
                  primaryTypographyProps={{ sx: { fontFamily: '"Nevan RUS", sans-serif', color: '#FFD700', fontSize: '14px' } }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                component={Link} 
                to="/logout" 
                onClick={() => setDrawerOpen(false)}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': { backgroundColor: 'rgba(255, 68, 68, 0.1)' },
                }}
              >
                <ListItemText
                  primary="LOGOUT"
                  primaryTypographyProps={{ sx: { fontFamily: '"Nevan RUS", sans-serif', color: '#FF4444', fontSize: '14px', fontWeight: 600 } }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          {signedUser && (
            <Box sx={{ px: 2, pb: 2, borderTop: '1px solid rgba(255, 215, 0, 0.2)', pt: 2 }}>
              <Typography sx={{ color: '#FFD700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Logged in as:
              </Typography>
              <Typography sx={{ color: 'white', fontSize: '12px', mt: 0.5 }}>
                {signedUser}
              </Typography>
            </Box>
          )}
        </Drawer>
      </motion.div>
    </Box>
  );
}

export default Header;
