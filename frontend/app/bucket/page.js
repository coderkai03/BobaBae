'use client'
import {Box, Grid, Stack, Typography} from '@mui/material'
import {useUser} from '@clerk/clerk-react'
import {useEffect, useState} from 'react'
import {collection, doc, getDoc} from 'firebase/firestore'
import {db} from '@/firebaseConfig'

export default function Bucket() {
  const {user, isLoading} = useUser()
  const [matchesData, setMatchesData] = useState([])

  useEffect(() => {
    const fetchMatchesData = async () => {
      if (isLoading) {
        console.log('User object is still loading.')
        return
      }

      if (!user) {
        console.log('User object is null or undefined.')
        return
      }

      const id = user.id
      // Get collection users, document id, and field matches from firebase
      const matches = await getDoc(doc(db, 'users', id)).then((doc) => {
        if (doc.exists()) {
          return doc.data().matches
        }
        return []
      })

      const matchesProfiles = await Promise.all(
        matches.map(async (docRef) => {
          try {
            const matchSnapshot = await getDoc(docRef)
            const matchData = matchSnapshot.data()
            return matchData
          } catch (error) {
            console.error('Error fetching match:', error)
            return null // Handle the error gracefully
          }
        }),
      )

      setMatchesData(matchesProfiles.filter((match) => match !== null)) // Remove null entries
    }

    fetchMatchesData()
  }, [user, isLoading])

  return (
    <Box
      width="100vw"
      minHeight="100vh"
      display="flex"
      alignItems="flex-start"
      padding={4}
      justifyContent="center"
      bgcolor="white"
    >
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        width="100%"
        flexGrow={1}
      >
        <Typography variant="h2" color="black">
          Boba Bucket List
        </Typography>
        <Grid container spacing={2} sx={{width: '80%', height: '60%'}}>
          {matchesData.map((matchData, index) => (
            <Grid
              item
              xs={6}
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50%',
                width: '100%',
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                spacing={2}
                width="100%"
                height="100%"
                bgcolor={'#250707'}
                borderRadius={8}
                padding={3}
              >
                <img height={200} borderRadius={4} src={matchData.photo} />
                <Stack
                  direction="column"
                  spacing={2}
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <Typography variant="h3" color="white">
                    {matchData.name}
                  </Typography>
                  <Typography variant="h7" color="white">
                    {matchData.school}
                  </Typography>
                  <Typography variant="h7" color="white">
                    {matchData.age}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  )
}
