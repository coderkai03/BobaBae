"use client"
import { Box, Stack, Typography, Button } from '@mui/material';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
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
    const filteredUsers = usersList.filter(userData => userData.id !== user.id);
    console.log(filteredUsers);
    
    setUsersData(filteredUsers);
  };

  useEffect(() => {
    if (!isLoading && user) {
      fetchUsers();
    }
  }, [user, isLoading]);

  const handleNextUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % usersData.length);
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
        <Stack
          direction="column"
          spacing={2}
          alignItems="flex-start"
          justifyContent="flex-start"
          bgcolor={'white'}
          borderRadius={4}
          padding={2}
        >
          {currentUser && (
            <Box key={currentUser.id}>
              <Typography variant="h3" color="black">
                {currentUser.name}
              </Typography>
              {/* <Typography variant="h7" color="black">
                {currentUser.age}
              </Typography>
              <Typography variant="h7" color="black">
                {currentUser.school}
              </Typography>
              <Typography variant="h7" color="black">
                {currentUser.dietaryTags}
              </Typography> */}
            </Box>
          )}
          <Button onClick={handleNextUser}>Next User</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
