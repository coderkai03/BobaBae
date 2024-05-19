"use client"
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Image from 'next/image'
import { colors } from '@mui/material';

export default function Home() {
  return (
    //home page
    <Box sx={{ fontFamily: 'Poppins'}}>
      {/* landing */}
      <Box bgcolor={"#e59e45"} display={"flex"} flexDirection={"column"} 
            width={"100vw"} height={"auto"} justifyContent={"center"} 
            alignItems={"center"} style={{ paddingTop: '90px'}}>
        <img width={"259px"} height={"215px"} src="/bobabae_logo.png" alt="logo" />
        <Typography variant="h3" gutterBottom>
          Bobabae
        </Typography>

        <Box display={"flex"}>
          <Stack direction="row" spacing={2}>

            <Button href='/swipe' sx={{color: 'black'}}>Home</Button>
            <Button href='/about-us' sx={{color: 'black'}}>About Us</Button>
            <Button href='/sign-in' sx={{color: 'black'}}>Join</Button>
          </Stack>
        </Box>

        <img src="/Group1.png" alt="boba" style={{ width: '100%', bottom: '0'}} />
      </Box>

      
      {/* tagline */}
      <Box bgcolor={'#2b0303'} display={"flex"} flexDirection={"column"} width={"100vw"} height={"20vh"} justifyContent={"center"} alignItems={"center"}>
        {/* body */}
        <Box>
          <Typography variant='h5' style={{ color: '#ffffff' }}>
          find yourself your boba bae!
          </Typography>
        </Box>
      </Box>

      {/* Discover */}
      <Box bgcolor={'#2b0303'} display={"flex"} flexDirection={"column"} width={"100vw"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
        {/* body */}
        <Box bgcolor={'#edefd8'} borderRadius={30} width={'100%'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} style={{ marginTop: '90px'}}>
          
          <Typography variant='h5'>DISCOVER</Typography>
          
          <img src="/bearhacks.jpg" alt="bearhacks" style={{ height: '50%', maxRadius: '50%', borderRadius: '1.25rem' }} />
          
          <Box width={'100px'} height={'100px'} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
            
            <img width='100%' src="/broba.png" alt="bearhacks" />
            
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
              <Typography  bgcolor={'#ffffff'} borderRadius={5} variant='h6' color='black'>About</Typography>
              <Typography variant='body1' color='white'>Tagline goes here</Typography>
            </Box>
          </Box>
          
        </Box>
      </Box>
    </Box>
  );
}
