import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import Footer from './Footer';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        color: 'white',
        textAlign: 'center',
        // Remove padding-bottom since footer won't be shown on home page
        pb: 0
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to MuskaanMovieHub
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Your one-stop destination for movies and TV shows
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 4,
            backgroundColor: '#fff',
            color: '#1a237e',
            '&:hover': {
              backgroundColor: '#f5f5f5'
            }
          }}
          onClick={() => navigate('/search')}
        >
          Start Exploring
        </Button>
      </Container>
    </Box>
  );
};

export default Home;