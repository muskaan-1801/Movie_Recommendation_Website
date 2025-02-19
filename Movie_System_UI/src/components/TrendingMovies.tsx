import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_KEY = "7c9f0926"; // Replace with your OMDb API key
const API_URL = "https://www.omdbapi.com/";

// Styled Components
const SliderContainer = styled(Box)({
  width: "100%",
  height: "50vh",
  marginTop: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

const MovieCard = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const MovieInfo = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.7)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  padding: "15px",
  textAlign: "center",
  transition: "opacity 0.3s ease-in-out",
  backdropFilter: "blur(5px)",
  "&:hover": {
    opacity: 1,
  },
});

const TrendingMovies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            s: "Batman",
            apiKey: API_KEY,
            type: "movie",
          },
        });

        console.log("Trending Movies API Response:", response.data); // ✅ Debugging

        if (response.data.Response === "True") {
          setMovies(response.data.Search.slice(0, 6));
        } else {
          console.error("Error fetching trending movies", response.data.Error);
        }
      } catch (error) {
        console.error("Error fetching trending movies", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  // ✅ Check if Movies Exist
  if (movies.length === 0) {
    return <Typography align="center">No trending movies found.</Typography>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    centerMode: true,
  };

  return (
    <SliderContainer>
      <Slider {...settings} style={{ width: "90%", height: "100%" }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ padding: "10px" }}>
            <MovieCard>
              <img src={movie.Poster} alt={movie.Title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <MovieInfo>
                <Typography variant="h5">{movie.Title}</Typography>
                <Typography variant="caption">📅 {movie.Year}</Typography>
              </MovieInfo>
            </MovieCard>
          </div>
        ))}
      </Slider>
    </SliderContainer>
  );
};

export default TrendingMovies;
