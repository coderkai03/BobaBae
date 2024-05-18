import {SignUp} from '@clerk/nextjs'
import {Box, Stack, Typography} from '@mui/material'

export default function Page() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#2b0303"
    >
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
        padding={3}
        bgcolor={'white'}
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
          <Typography variant="h1" color="primary">
            Sign In
          </Typography>
        </Box>
        <SignUp path="/sign-up" />
      </Stack>
    </Box>
  )
}
