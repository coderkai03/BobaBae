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
    >
      {/* Sign Out Button */}
      <Box
        width="100%"
        display="flex"
        justifyContent="flex-end"
        paddingRight={2}
      >
        <Button onClick={() => signOut()} variant="contained" color="primary">
          Sign Out
        </Button>
      </Box>

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

        <Box display="flex" alignItems="center">
          {/* Left Image */}
          <Box>
            <img src="/xmark.png" onClick={handleNextUser} alt="pass" style={{ width: '100px', height: '100px' }} />
          </Box>

          {/* Profile Stack */}
          <Stack
            direction="column"
            spacing={2}
            alignItems="flex-start"
            justifyContent="flex-start"
            bgcolor={'white'}
            borderRadius={4}
            padding={2}
            marginX={2}
            width={400}
            height={600}
          >
            {currentUser && (
              <Box
                key={currentUser.id}
                display="flex"
                flexDirection="column"
                justifyItems={'flex-start'}
              >
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
              </Box>
            )}
          </Stack>

          {/* Right Image */}
          <Box>
            <img src="/checkmark.png" onClick={handleMatch} alt="match" style={{ width: '100px', height: '100px' }} />
          </Box>
        </Box>
      </Stack>

      {/* Menu Buttons */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        padding={2}
      >
        <Button href='/bucket' variant="contained" color="primary" sx={{ borderRadius: '100%', textAlign: 'center' }}>
          Baes
        </Button>
        <Button href='/swipe' variant="contained" color="primary" sx={{ borderRadius: '100%', textAlign: 'center' }}>
          lets<br/>swipe
        </Button>
        <Button href='/profile' variant='contained' color="primary" sx={{ borderRadius: '100%', textAlign: 'center' }}>
          Profile
        </Button>
      </Stack>
    </Box>
  );
}
