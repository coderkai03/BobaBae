import {Inter} from 'next/font/google'
import './globals.css'
import {ClerkProvider} from '@clerk/nextjs'
import {Box, Button, Stack, Typography} from '@mui/material'

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({children}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Stack
            position="fixed"
            bottom={0}
            width="100%"
            padding={2}
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            bgcolor={'#E59E45'}
          >
            <Button
              href="/bucket"
              sx={{
                bgcolor: '#D9D9D9',
                width: 100,
                height: 100,
                borderRadius: '50%',
              }}
            >
              <Typography
                variant="h7"
                align="center"
                sx={{
                  color: 'black',
                }}
              >
                Boba Bucket List
              </Typography>
            </Button>
            <Button
              href="/swipe"
              sx={{
                bgcolor: '#BFBFBF',
                width: 100,
                height: 100,
                borderRadius: '50%',
              }}
            >
              <Typography
                variant="h7"
                sx={{
                  color: 'black',
                }}
              >
                Let's Swipe{' '}
              </Typography>
            </Button>
            <Button
              href="/profile"
              sx={{
                bgcolor: '#D9D9D9',
                width: 100,
                height: 100,
                borderRadius: '50%',
              }}
            >
              <Typography
                variant="h7"
                sx={{
                  color: 'black',
                }}
              >
                Profile{' '}
              </Typography>
            </Button>
          </Stack>
        </body>
      </html>
    </ClerkProvider>
  )
}
