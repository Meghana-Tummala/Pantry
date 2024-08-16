'use client';

import { Box, Button, Grid, IconButton, Modal, Stack, TextField, Typography } from '@mui/material';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { firestore } from '../firebase';
import { Syne, Archivo_Narrow } from 'next/font/google';
import { useRouter} from 'next/navigation'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import React from 'react';

const syne = Syne({ weight: ['400', '800'], subsets: ['latin'] });
const archivoNarrow = Archivo_Narrow({ weight: ['400', '700'], style: ['normal', 'italic'], subsets: ['latin'] });

const theme = createTheme({
  typography: {
    fontFamily: `${syne.style.fontFamily}, sans-serif`,
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#333',
      marginBottom: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  palette: {
    primary: {
      main: '#B3D9E0',
    },
    secondary: {
      main: '#B3D9E0',
    },
    background: {
      default: '#B3D9E0',
      paper: '#F1A805',
    },
    text: {
      primary: '#333333',  // Dark gray for readability
    },
  },
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function Home() {
  
  const router = useRouter();
  const [pantry, setPantry] = useState<any[]>([]);
  const [newItem, setNewItem] = useState(''); // State for new item input
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList: any[] = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });

    setPantry(pantryList);
  };

  const removeItem = async (itemName: string) => {
    const docRef = doc(collection(firestore, 'pantry'), itemName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const quantity = data?.quantity;
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updatePantry();
  };

  const addItem = async (itemName: string) => {
    const docRef = doc(collection(firestore, 'pantry'), itemName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updatePantry();
  };

  useEffect(() => {
    updatePantry();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      //bgcolor={'#ffffff'}
      gap={2}
      sx={{backgroundImage:"url('/pantry-bg.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
        bgcolor: theme.palette.background.default}}
    >
      <IconButton
            size="large"
            edge="end"
            color="primary"
            aria-label="home"
            
            sx={{ ml: 150}}
            onClick={()=> {router.push("/")}}
          >
            <AccountCircleIcon />
          </IconButton>  
      
      <Stack direction="row" spacing={4} padding={3} paddingRight={4}>
      <Typography variant="h1" component="h2" color={"#69233E"} fontFamily={`${archivoNarrow.style.fontFamily}, sans-serif`} fontWeight={700}>
        ORGANISE YOUR PANTRY
      </Typography>
      <Box height={'50%'}>
        <Box width={'800px'} height={'125px'} sx={{ bgcolor: theme.palette.background.paper }} display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2}>
          <Typography variant={'h2'} color={"#69233E"} textAlign={'center'}>
            Pantry Items
          </Typography>
          <Button onClick={handleOpen} variant='contained' color='primary'>Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color={theme.palette.text.primary}>
            Add Item
          </Typography>
          <Stack width={'100%'} direction={'row'} spacing={2}>
            <TextField
              variant='outlined'
              fullWidth
              value={newItem} // Bind to newItem state
              onChange={(e) => setNewItem(e.target.value)} // Update newItem state
            />
            <Button onClick={() => { addItem(newItem); setNewItem(''); handleClose(); }} variant='contained' color='secondary'>Add Item</Button>
          </Stack>
        </Box>
      </Modal>
        </Box>
        <Stack width="800px" height="245px" spacing={2} overflow={'auto'}>
          {pantry.map((i) => (
            <Box
              key={i.name} // Use unique key
              width="100%"
              minHeight="100px"
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              padding={5}
              onClick={() => removeItem(i.name)} // Allow removal on click
            >
              <Typography
                variant={'h4'}
                color={theme.palette.text.primary}
                textAlign={'center'}
              >
                {i.name.charAt(0).toUpperCase() + i.name.slice(1)} - {i.quantity}
              </Typography>
              <Button
              variant='contained'
              color='primary'
              onClick={() => {removeItem(i.name)}}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
      
      </Stack>
    </Box>
    </ThemeProvider>
  );
}
