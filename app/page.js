"use client"
import * as React from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { SignedOut, SignedIn } from '@clerk/nextjs';

// Initialize Firebase app
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
    <Box>
      {/* Landing Section */}
      <Box
        bgcolor={"#e59e45"}
        display={"flex"}
        flexDirection={"column"}
        width={"100vw"}
        height={"90vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img
          width={"259px"}
          height={"215px"}
          src="/bobabae_logo.png"
          alt="logo"
        />
        <Typography variant="h3" gutterBottom>
          Boba Bae
        </Typography>
        <Box display={"flex"}>
          <Stack direction="row" spacing={2}>
            <Button href="/swipe" sx={{ color: "black" }}>
              Swipe!
            </Button>
            <Button href="/about-us" sx={{ color: "black" }}>
              About Us
            </Button>
            <SignedOut>
              <Button href="/sign-up" sx={{ color: "black" }}>
                Join
              </Button>
            </SignedOut>
            <SignedIn>
              <Button onClick={signOut} sx={{ color: "black" }}>
                Sign Out
              </Button>
            </SignedIn>
          </Stack>
        </Box>
      </Box>

      {/* Tagline Section */}
      <Box
        bgcolor={"#975629"}
        display={"flex"}
        flexDirection={"column"}
        width={"100vw"}
        height={"10vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Poppins",
            fontSize: "50px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
            letterSpacing: "5.5px",
            textShadow: `
      -4px -4px 0 #fff,  
       4px -4px 0 #fff,
      -4px  4px 0 #fff,
       4px  4px 0 #fff,
      -4px  0 0 #fff,
       4px  0 0 #fff,
       0  -4px 0 #fff,
       0   4px 0 #fff`,
          }}
        >
          Looking for boba? Let's be baes!
        </Typography>
      </Box>

      {/* Discover Section */}
      <Stack
        bgcolor={"#975629"}
        spacing={2}
        display={"flex"}
        flexDirection={"column"}
        width={"100vw"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack
          bgcolor={"#edefd8"}
          borderRadius={10}
          width={"100%"}
          height={"100%"}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={8}
          spacing={8}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#975629",

              fontFamily: "Inter",
              fontSize: "150px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              letterSpacing: "16.5px",
              textShadow: `
                -4px -4px 0 #2B0303,  
                4px -4px 0 #2B0303,
                -4px  4px 0 #2B0303,
                4px  4px 0 #2B0303,
                -4px  0 0 #2B0303,
                4px  0 0 #2B0303,
                0  -4px 0 #2B0303,
                0   4px 0 #2B0303`,
           }}
          >
            DISCOVER
          </Typography>
          <img
            src="/bearhacks.jpg"
            alt="bearhacks"
            height={800}
            style={{ borderRadius: "1.25rem" }}
          />
          <Stack
            width={"80vw"}
            height={"100px"}
            direction="row"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <img height={150} src="/broba.png" alt="bearhacks" />
            <Stack
              direction="column"
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
            >
              <Typography borderRadius={5} variant="h3" color="black">
                What is BOBABAE?
              </Typography>
              <Typography variant="h5" color="black">
                A social app for connecting boba lovers
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
