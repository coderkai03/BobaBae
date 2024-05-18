"use client"
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { colors } from '@mui/material';

export default function TransitionsModal() {
  return (
    //home page
    <Box>
      {/* landing */}
      <Box bgcolor={"#e59e45"} display={"flex"} flexDirection={"column"} width={"100vw"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
        
        <img width={"259px"} height={"215px"} src="/bobabae_logo.png" alt="logo" />
        <Typography variant="h3" gutterBottom>
          Boba Bae
        </Typography>

        <Box display={"flex"}>
          <Stack direction="row" spacing={2}>

            <Button sx={{color: 'black'}}>Home</Button>
            <Button sx={{color: 'black'}}>About Us</Button>
            <Button sx={{color: 'black'}}>Join</Button>
          </Stack>

        </Box>
      </Box>

      
      {/* tagline */}
      <Box display={"flex"} flexDirection={"column"} width={"100vw"} height={"10"} justifyContent={"center"} alignItems={"center"}>
        {/* body */}
        <Box>
          <Typography variant='h5'>
            Looking for boba? Let's be baes ;{")"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
