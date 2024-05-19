"use client"
import { Box, Stack, Typography, Button } from '@mui/material';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { updateDoc, doc, collection, getDocs, arrayUnion } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function Swipe() {
  const { user, isLoading } = useUser();
  const { signOut } = useAuth();
  const [usersData, setUsersData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(user)

  const fetchUsers = async () => {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Filter out the current user
    const filteredUsers = usersList.filter(userData => userData.id !== user.id).sort(() => Math.random() - 0.5);
    console.log(filteredUsers);
    
    setUsersData(filteredUsers);
  };

  useEffect(() => {
    if (!isLoading && user) {
      fetchUsers();
    }
  }, [user, isLoading]);

  const handleNextUser = () => {
    console.log('Skipped: ', currentUser);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % usersData.length);
  };

  const handleMatch = async () => { 
    console.log('Matched with: ', currentUser);
    const matchedUser = usersData[currentIndex];
    const matchedUserId = doc(db, 'users', matchedUser.id);
    
    // Add matchedUserId to the current user's matches array in Firebase
    const userRef = doc(db, 'users', user.id);
    try {
      await updateDoc(userRef, {
        matches: arrayUnion(matchedUserId)
      }, { merge: true }); // Add { merge: true } to merge the new data with existing fields
      console.log('Document update successful');
    } catch (error) {
      console.log('Document update failed:', error);
    }
    
    handleNextUser();

    // Log the user's matches
    const userMatches = user.matches || [];
    console.log('User matches:', userMatches);
  };

  // Render loading state while user data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (usersData.length === 0) {
    return <div>No users found</div>;
  }

  const currentUser = usersData[currentIndex];

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingTop={4}
      justifyContent="center"
      bgcolor="#f0ad52"
      overflow="hidden"
    >
      {/* Sign Out Button */}
      
        <Button onClick={() => signOut()} variant="contained" color="primary" sx={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
        }}>
          Sign Out
        </Button>
      

      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
      >
        <Typography variant="h2" color="black">
          Let's Swipe, {user.firstName}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={20}>
          {/* Left Image */}
          <Button onClick={handleNextUser} sx={{
            borderRadius: '100%',
          }}>
            <img src="/xmark.png" alt="pass" style={{ width: '100px', height: '100px' }} />
          </Button>

          {/* Profile Stack */}
          {currentUser &&(<Stack
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            bgcolor={'white'}
            borderRadius={4}
            padding={2}
            marginX={2}
            width={400}
            height={600}
          >

                {currentUser.hasPhoto ? 
                <img src={currentUser.photo} alt="bae" style={{ height: '30%', borderRadius: '1.25rem' }} /> :
                <img src={'/broba.png'} alt="bae" style={{ height: '30%', borderRadius: '1.25rem' }} />}
                <Typography variant="h3" color="black">
                  {currentUser.name}
                </Typography>
                <Typography variant="h7" color="black">
                  Age: {currentUser.age}
                </Typography>
                <Typography variant="h7" color="black">
                  School: {currentUser.school}
                </Typography>
                {/* <Typography variant="h7" color="black">
                  {currentUser.dietaryTags}
                </Typography> */}

          </Stack>)}

          {/* Right Image */}
          <Button onClick={handleMatch} sx={{
            borderRadius: '100%',
          }}>
            <img src="/checkmark.png"alt="match" style={{ width: '100px', height: '100px' }} />
          </Button>
        </Stack>
      </Stack>

      {/* Menu Buttons */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        padding={2}
      >
        <MenuButton href='/bucket'>
          Baes
        </MenuButton>
        <MenuButton href='/swipe' >
          Lets<br/>swipe
        </MenuButton>
        <MenuButton href='/profile' >
          Profile
        </MenuButton>
      </Stack>
    </Box>
  );
}

const MenuButton = ({ href, children }) => (
  <Button href
    variant="contained"
    color="primary"
    sx={{
      borderRadius: '100%',
      textAlign: 'center',
      height: '100px',
      width: '100px',
    }}
  >
    {children}
  </Button>
);
