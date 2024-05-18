import {Box, Stack, Typography} from '@mui/material'

export default function Swipe() {
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
          Let's Swipe
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
          <Box
            width={400}
            height={400}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius={2}
            sx={{
              background: 'linear-gradient(180deg, #EDEFD8 79.95%, #FFF 100%)',
            }}
          >
            <Typography variant="h7" color="black">
              Boba Pic
            </Typography>
          </Box>
          <Typography variant="h3" color="black">
            Boba Name
          </Typography>
          <Typography variant="h7" color="black">
            Shop Name
          </Typography>
          <Typography variant="h7" color="black">
            Location
          </Typography>
          <Typography variant="h7" color="black">
            Dietary Tags
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
