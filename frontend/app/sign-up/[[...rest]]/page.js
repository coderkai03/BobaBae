import {SignUp} from '@clerk/nextjs'
import {Box, Stack, Typography} from '@mui/material'

export default function Page() {
  return (
    <Box
      // width="100vw"
      // height="100vh"
      // display="flex"
      // alignItems="center"
      // justifyContent="center"
      // bgcolor="#2b0303"
      style={{
        backgroundImage: `url('/signUp.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
          borderRadius={2}
        >
          {/* <Typography variant="h1" color="primary">
            Sign Up
          </Typography> */}

          <img src="/newuser.png" alt="new user" 
              style={{ height: '100%', maxRadius: '50%'}} />

        </Box>
        <SignUp path="/sign-up" />
      </Stack>
    </Box>
  )
}
