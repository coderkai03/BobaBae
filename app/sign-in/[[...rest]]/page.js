import {SignIn} from '@clerk/nextjs'
import {Box, Stack, Typography} from '@mui/material'

export default function Page() {
  return (
    <Box
      style={{
        backgroundImage: `url('/signIn.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0',
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
        padding={3}
        bgcolor={'#EDEFD8'}
        borderRadius={4}
      >
        <Box
          width={500}
          height={500}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* <Typography variant="h1" color="primary">
            Sign In
          </Typography> */}

          <img src="/welcomeback.png" alt="welcomeback" 
              style={{ height: '100%', maxRadius: '50%'}} />
        </Box>
        <SignIn path="/sign-in" />
      </Stack>
    </Box>
  )
}
