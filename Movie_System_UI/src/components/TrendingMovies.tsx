import React, { useState, useEffect } from "react";
import { Container, Box, Card, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

const API_KEY = "7c9f0926"; // Replace with your OMDb API key
const API_URL = "http://www.omdbapi.com/";

// Styling for the carousel container
const CarouselContainer = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  width: "300%",
  marginTop: -200, // Adjusted gap from navbar (increase or decrease as needed)
  paddingTop: "20px", // Adjust padding-top to push down the content below the navbar
}));

// Styling for the movie slider (with smoother animation)
const MovieSlider = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px", // Space between cards
  animation: "slide 6s infinite linear", // Adjusted the speed
  "@keyframes slide": {
    "0%": {
      transform: "translateX(0)",
    },
    "100%": {
      transform: "translateX(-100%)",
    },
  },
}));

// Styling for individual movie cards
const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  // width: "calc(100% / 4)", // Increase width of each card (4 cards per row)
  borderRadius: "12px", // Rounded corners for a modern look
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Soft shadow for better visibility
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)", // Slight zoom-in effect
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)", // Enhanced shadow on hover
  },
}));

// Styling for movie details that appear on hover
const MovieDetails = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.7)", // Dark overlay
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
  "&:hover": {
    opacity: 1, // Fade in details on hover
  },
  padding: "10px",
}));

const MovieSliderComponent: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            s: "action", // Adjust the query to your needs
            apiKey: API_KEY,
          },
        });

        if (response.data.Response === "True") {
          setMovies(response.data.Search);
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Container sx={{ padding: 0 }}>
      <CarouselContainer>
        <MovieSlider>
          {movies.slice(0, 10).map((movie) => (
            <StyledCard key={movie.imdbID}>
              <CardMedia
                component="img"
                height="400" // Increased height of the image for better display
                width="100%" // Ensure the image fills the card's width
                image={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
                alt={movie.Title}
              />
              <MovieDetails>
                <Box sx={{ textAlign: "center", padding: "10px" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {movie.Title}
                  </Typography>
                  <Typography variant="body2">{movie.Year}</Typography>
                  <Typography variant="body2">{movie.Type.toUpperCase()}</Typography>
                </Box>
              </MovieDetails>
            </StyledCard>
          ))}
        </MovieSlider>
      </CarouselContainer>
    </Container>
  );
};

export default MovieSliderComponent;
