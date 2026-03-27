import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import loginicon from '../Assests/loginicon.svg';
import carticon from '../Assests/carticon.svg';
import subtract from '../Assests/Subtract.svg';

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
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('signedUpUsername');
    if (storedUser) setSignedUser(storedUser);
  }, []);

  return (
    <Box sx={{ backgroundColor: 'black', color: '#FFFFFF', px: { xs: 2, md: 4 }, py: 2, position: 'sticky', top: 0, zIndex: 1100 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Typography
          variant="h6"
          sx={{ fontFamily: '"Nevan RUS", sans-serif', fontWeight: 600, fontSize: { xs: '18px', md: '24px' }, color: 'white' }}
        >
          GAME VAULT
        </Typography>

        {/* Desktop Nav */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Button key={link.path} component={Link} to={link.path}
                sx={{
                  color: isActive ? '#FFD700' : 'white',
                  fontFamily: '"Nevan RUS", sans-serif',
                  fontSize: '13px',
                  borderBottom: isActive ? '2px solid #FFD700' : '2px solid transparent',
                  borderRadius: 0,
                  pb: '2px',
                  '&:hover': { color: '#FFD700', borderBottom: '2px solid #FFD700' },
                }}>
                {link.label}
              </Button>
            );
          })}
        </Box>

        {/* Desktop Icons */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          <Button component={Link} to="/cart">
            <img src={carticon} alt="Cart" />
            {cartCount > 0 && (
              <Typography sx={{ ml: 0.5, fontSize: '0.75rem', color: 'red' }}>{cartCount}</Typography>
            )}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Button component={Link} to="/sign">
              <img src={subtract} alt="Profile" />
            </Button>
            {signedUser && (
              <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#FFD700', display: 'block', mt: '-4px' }}>
                {signedUser}
              </Typography>
            )}
          </Box>
          <Button component={Link} to="/logout">
            <img src={loginicon} alt="Logout" />
          </Button>
        </Box>

        {/* Mobile: cart icon + hamburger */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 0.5 }}>
          <Button component={Link} to="/cart" sx={{ minWidth: 0, p: 0.5 }}>
            <img src={carticon} alt="Cart" style={{ width: 26, height: 26 }} />
            {cartCount > 0 && (
              <Typography sx={{ ml: 0.5, fontSize: '0.75rem', color: 'red' }}>{cartCount}</Typography>
            )}
          </Button>
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'white' }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { backgroundColor: '#111', color: 'white', width: 230 } }}
      >
        <List>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <ListItem key={link.path} disablePadding>
                <ListItemButton
                  component={Link} to={link.path}
                  onClick={() => setDrawerOpen(false)}
                  sx={{ borderLeft: isActive ? '3px solid #FFD700' : '3px solid transparent', backgroundColor: isActive ? '#1a1a1a' : 'transparent' }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{ sx: { fontFamily: '"Nevan RUS", sans-serif', color: isActive ? '#FFD700' : 'white', fontSize: '14px', fontWeight: isActive ? 700 : 400 } }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/sign" onClick={() => setDrawerOpen(false)}>
              <ListItemText
                primary="PROFILE"
                primaryTypographyProps={{ sx: { fontFamily: '"Nevan RUS", sans-serif', color: 'white', fontSize: '14px' } }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/logout" onClick={() => setDrawerOpen(false)}>
              <ListItemText
                primary="LOGOUT"
                primaryTypographyProps={{ sx: { fontFamily: '"Nevan RUS", sans-serif', color: '#ff4444', fontSize: '14px' } }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        {signedUser && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography sx={{ color: '#FFD700', fontSize: '12px' }}>Logged in as: {signedUser}</Typography>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}

export default Header;
