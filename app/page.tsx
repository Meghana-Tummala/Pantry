'use client'
import * as React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Syne, Archivo_Narrow } from 'next/font/google';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const syne = Syne({ weight: ['400', '800'], subsets: ['latin'] });
const archivoNarrow = Archivo_Narrow({ weight: ['400', '700'], style: ['normal', 'italic'], subsets: ['latin'] });
function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  const router = useRouter();
  return (
    <>
    <Box bgcolor={"#f0f0f0"}
    sx={{backgroundImage:"url('https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat',}}
    width="100vw"
    height="100vh">

<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'#0000FF' }}>
            My Pantry
          </Typography>
          <Button color="primary">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>  
    <Box maxWidth={600} textAlign={'center'}>
        <Typography variant="h1" color="#FF6C1F" fontFamily={`${syne.style.fontFamily}, sans-serif`} fontWeight={550}>
          Welcome to Your Pantry Tracker
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/signin')}
          sx={{ mt: 4 }}
        >
          Sign In
        </Button>
      </Box>
      </Box>
      </>
  );
}


