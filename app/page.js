"use client"
import * as React from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

// Initialize Firebase app

export default function Home() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  React.useEffect(() => {
    const checkUserData = async () => {
      console.log("isSignedIn:", isSignedIn);
      console.log("userId:", user?.id);
      
      if (isSignedIn && user?.id) {
        console.log("User ID:", user.id);
        const userId = user.id;
        const userDocRef = doc(db, 'users', userId);
        
        try {
          const userDocSnap = await getDoc(userDocRef);
          console.log("User document:", userDocSnap.data());
          
          if (!userDocSnap.exists()) {
            // User document doesn't exist, create one
            await setDoc(userDocRef, { name: user.fullName, users: [] });
          }
          
          // Redirect to '/swipe'
          router.push('/swipe');
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        console.log("Not signed in");
      }
    };
  
    checkUserData();
  }, [isSignedIn, router, user]);
  

  return (
    <Box>
      {/* Landing Section */}
      <Box bgcolor={"#e59e45"} display={"flex"} flexDirection={"column"} width={"100vw"} height={"90vh"} justifyContent={"center"} alignItems={"center"}>
        <img width={"259px"} height={"215px"} src="/bobabae_logo.png" alt="logo" />
        <Typography variant="h3" gutterBottom>
          Boba Bae
        </Typography>
        <Box display={"flex"}>
          <Stack direction="row" spacing={2}>
            <Button href='/swipe' sx={{color: 'black'}}>Home</Button>
            <Button href='/about-us' sx={{color: 'black'}}>About Us</Button>
            <Button href='/sign-in' sx={{color: 'black'}}>Join</Button>
          </Stack>
        </Box>
      </Box>

      {/* Tagline Section */}
      <Box bgcolor={'#975629'} display={"flex"} flexDirection={"column"} width={"100vw"} height={"10vh"} justifyContent={"center"} alignItems={"center"}>
        <Typography variant='h5'>
          Looking for boba? Let's be baes ;)
        </Typography>
      </Box>

      {/* Discover Section */}
      <Box bgcolor={'#975629'} display={"flex"} flexDirection={"column"} width={"100vw"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
        <Box bgcolor={'#edefd8'} borderRadius={10} width={'100%'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <Typography variant='h5'>DISCOVER</Typography>
          <img src="/bearhacks.jpg" alt="bearhacks" style={{ height: '50%', borderRadius: '1.25rem' }} />
          <Box width={'100px'} height={'100px'} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
            <img width='100%' src="/broba.png" alt="bearhacks" />
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
              <Typography bgcolor={'#ffffff'} borderRadius={5} variant='h6' color='black'>About</Typography>
              <Typography variant='body1' color='white'>Tagline goes here</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
