import {Box, Grid, Stack, Typography} from '@mui/material'
export default function Bucket() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="flex-start"
      paddingTop={4}
      justifyContent="center"
      bgcolor="white"
    >
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        width="100%"
        height="100%"
        flexGrow={1}
      >
        <Typography variant="h2" color="black">
          Boba Bucket List
        </Typography>
        <Grid container spacing={2} sx={{width: '80%', height: '60%'}}>
          {[...Array(4)].map((_, index) => (
            <Grid
              item
              xs={6}
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50%%',
                width: '100%',
              }}
            >
              <Stack
                direction="row"
                alightItems="center"
                justifyContent="flex-start"
                spacing={2}
                width="100%"
                height="100%"
                bgcolor={'#250707'}
                borderRadius={8}
                padding={3}
              >
                <Box
                  height="90%"
                  width="40%"
                  borderRadius={4}
                  sx={{
                    background:
                      'linear-gradient(180deg, #EDEFD8 0%, #250707 100%)',
                  }}
                />
                <Stack
                  direction="column"
                  spacing={2}
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <Typography variant="h3" color="white">
                    Boba Name
                  </Typography>
                  <Typography variant="h7" color="white">
                    Shop Name
                  </Typography>
                  <Typography variant="h7" color="white">
                    Location
                  </Typography>
                  <Typography variant="h7" color="white">
                    Dietary Tags
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
