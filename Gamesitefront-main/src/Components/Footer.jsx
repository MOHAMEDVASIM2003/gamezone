import React from 'react';
import { Box, Grid, Typography, InputBase, Button } from '@mui/material';
import gif1 from '../Assests/gif1.gif';

function Footer() {
  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: '300px', overflow: 'hidden', color: '#fff' }}>
      {/* Background GIF */}
      <Box
        component="img"
        src={gif1}
        alt="Background"
        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          minHeight: '300px',
          bgcolor: 'rgba(0,0,0,0.65)',
          px: { xs: 3, md: 6 },
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Grid container spacing={3}>
          {/* Left */}
          <Grid item xs={12} md={5}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#bbb', letterSpacing: 1 }}>
                GAME VAULT
              </Typography>
              <Typography>About Us</Typography>
              <Typography>Contact</Typography>
              <Typography>Terms &</Typography>
              <Typography>Privacy Policy</Typography>
              <Typography>FAQ</Typography>
            </Box>
          </Grid>

          {/* Right */}
          <Grid item xs={12} md={7} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              justifyContent="center"
              height="100%"
              gap={2}
              pt={{ xs: 2, md: 0 }}
              sx={{ textAlign: { xs: 'left', md: 'right' } }}
            >
              <Typography variant="h5" sx={{ fontWeight: 300, letterSpacing: 1, color: '#7A7A7A' }}>
                Join Us On <span style={{ fontWeight: 500 }}>World</span>
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  borderRadius: 20,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.2)',
                  width: { xs: '100%', md: '420px' },
                  height: '45px',
                }}
              >
                <InputBase
                  placeholder="Enter E-Mail"
                  sx={{ px: 2, flex: 1, color: '#fff', '&::placeholder': { color: '#ccc' } }}
                />
                <Box sx={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                <Button
                  sx={{
                    px: 2,
                    color: '#fff',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    borderRadius: 0,
                    textTransform: 'none',
                    fontWeight: 400,
                    minWidth: '110px',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.7)' },
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" sx={{ color: '#ccc' }}>
            © 2025 Game Vault Gaming Store
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
