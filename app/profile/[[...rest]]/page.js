import {UserProfile} from '@clerk/nextjs'
import {Box, Stack, Typography} from '@mui/material'

export default function Profile() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="flex-start"
      paddingTop={4}
      justifyContent="center"
      bgcolor="#f0ad52"
    >
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h2" color="black">
          Profile
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
          <UserProfile
            path="/profile"
            appearance={{
              elements: {
                cardBox: {
                  width: 800,
                  height: 600,
                },
              },
            }}
          />
        </Stack>
      </Stack>
    </Box>
  )
}
