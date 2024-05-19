"use client"
import * as React from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignedOut, SignedIn } from '@clerk/nextjs';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',  //Default font
    h3:{
      fontFamily: 'Rubik Mono One, sans-serif',
      fontSize: '100px',
      color: '#2B0303'
    },
    button:{
      fontFamily: 'Poppins',
      fontSize: '20px',
      textTransform: 'none',
    },
    h5:{
      fontFamily: 'Rubik Mono One, sans-serif',
      fontSize: '50px',
      color: '#2B0303',
      WebkitTextStroke: '2px #EDEFD8'
    },
    h1:{
      fontFamily: 'Rubik Mono One, sans-serif',
      fontSize: '100px',
      color: '#975629',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      marginTop: '-60px',
      marginBottom: '20px',
    },
    h6:{
      fontFamily: 'Poppins',
      fontSize: '20px',
      color: '#EDEFD8',
    },
    p:{
      fontFamily: 'Poppins',
      fontSize: '30px',
      color: '#EDEFD8',
    },
  },  
});

export default function Home() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth();

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
            await setDoc(userDocRef, { name: user.fullName, photo: user.imageUrl, hasImage: user.hasImage ,users: [] });
          }
          
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        console.log("Not signed in");
      }
    };
  
    checkUserData();
  }, [isSignedIn, user]);
  

  return (
    <ThemeProvider theme={theme}>
    {/* home page */}
        <Box sx={{ fontFamily: 'Poppins'}}>
      {/* landing */}
      <Box bgcolor={"#e59e45"} display={"flex"} flexDirection={"column"} 
            width={"100vw"} height={"auto"} justifyContent={"center"} 
            alignItems={"center"} style={{ paddingTop: '10%'}}>
        <img width={"350px"} height={"auto"} src="/bobabae_logo.png" alt="logo" 
          style={{
            animation: 'floatUpDown 2s infinite alternate',
          }}
        />

          <style jsx>{`
            @keyframes floatUpDown{
              0%{
                transform: translateY(0);
              }
              100%{
                transform: translateY(-30px);
              }
            }
          `}</style>

        <Typography variant="h3" gutterBottom marginBottom={'0'}>
          Bobabae
        </Typography>

        <Box display={"flex"} >
          <Stack direction="row" spacing={2}>

            <Button href='/swipe' sx={{color: '#2B0303', ':hover':{backgroundColor:'transparent', border:'2px solid #2B0303', borderRadius: '8px'}}}>Home</Button>
            <Button href='/about-us' sx={{color: '#2B0303', ':hover':{backgroundColor:'transparent', border:'2px solid #2B0303', borderRadius: '8px'}}}>About Us</Button>
            <SignedOut>
            <Button href='/sign-in' sx={{color: '#2B0303', ':hover':{backgroundColor:'transparent', border:'2px solid #2B0303', borderRadius: '8px'}}}>Join</Button>
              </SignedOut>
            <SignedIn>
              <Button onClick={signOut} sx={{color: '#2B0303', ':hover':{backgroundColor:'transparent', border:'2px solid #2B0303', borderRadius: '8px'}}}>Sign Out</Button>
            </SignedIn>
              </Stack>
        </Box>

        <img src="/Group1.png" alt="boba" style={{ width: '100%', bottom: '0', marginTop: '-75px'}} />
      </Box>

      
      {/* tagline */}
      <Box bgcolor={'#2b0303'} display={"flex"} flexDirection={"column"} width={"100vw"} height={"20vh"} justifyContent={"center"} alignItems={"center"}>
        {/* body */}
        <Box>
          <Typography variant='h5'>
          find yourself your boba bae!
          </Typography>
        </Box>
      </Box>

      {/* Discover */}
      <Box 
        bgcolor={'#2b0303'} 
        display={"flex"} 
        flexDirection={"column"} 
        width={"100vw"} 
        height={"100vh"} 
        justifyContent={"center"} 
        alignItems={"center"}
      >
        {/* body */}
        <Box 
          sx={{
            borderTopLeftRadius: '200px',
            borderTopRightRadius: '200px',
          }}
          bgcolor={'#edefd8'} 
          width={'100%'} 
          height={'700%'} 
          display={'flex'} 
          flexDirection={'column'} 
          justifyContent={'center'} 
          alignItems={'center'} 
          style={{ marginTop: '70px'}}
        >
          
          <Typography variant='h1' mt={'60px'}
            style = {{ overflowY: 'hidden'}}>
            DISCOVER MORE
          </Typography>
          
          <img src="/bearhacks.jpg" alt="bearhacks" style={{ height: '50%', maxRadius: '50%', borderRadius: '1.25rem', boxShadow: '0 0px 30px rgb(151, 86, 41)' }} />
          
          <Box 
            // width={'100px'} 
            // height={'100px'} 
            display={'flex'} 
            flexDirection={'row'} 
            justifyContent={'center'} 
            alignItems={'center'}
            // mt={5}
          >
            
            <img src="/icon.png" alt="icon" 
              // display={'flex'}
              // sx={{
              //   width: '100px',
              //   height: '100px',
              //   marginTop:'100px',
              //   marginBottom:'100px',
              // }}
              style={{
                width: '100px', 
                height: 'auto', 
                marginTop: '10px',
                marginRight: '20px', 
                marginBottom: '50px',
              }}
            />
            
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
              <Typography borderRadius={5} variant='h6' color='black'>
                Bobabae is a social app where you can find a buddy and grab boba together. 
              </Typography>
            </Box>
          </Box>
        </Box>
        <img src="/Group5.png" alt="boba" style={{ width: '100%', height: '100%', bottom: '0', marginTop: '-70px'}} />
      </Box>

      {/* footer */}
      <Box bgcolor={'#975629'} display={"flex"} flexDirection={"column"} width={"100vw"} height={"15vh"} justifyContent={"center"} alignItems={"center"}>
        <Typography variant='p'> ERAs Team ©</Typography>
      </Box>
    </Box>
    </ThemeProvider>
  );
}
