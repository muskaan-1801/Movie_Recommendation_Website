import React, { useState } from "react";
import { CssBaseline, Container, Grid, Card, CardMedia, CardContent, Typography, Skeleton, Pagination } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import Navbar from "./Navbar";

const API_KEY = "7c9f0926"; // Replace with your OMDb API key
const API_URL = "http://www.omdbapi.com/";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const fetchMovies = async (searchQuery: string, pageNum: number = 1) => {
    if (!searchQuery) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API_URL, {
        params: {
          s: searchQuery,
          page: pageNum,
          apiKey: API_KEY,
        },
      });

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setTotalPages(Math.ceil(parseInt(response.data.totalResults) / 10));
      } else {
        setMovies([]);
        setError(response.data.Error || "No movies found.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Error fetching movies. Try again.");
    }

    setLoading(false);
  };

  const handleSearch = () => {
    setPage(1);
    fetchMovies(query, 1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchMovies(query, value);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#000" : "#F8F8F8",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} query={query} setQuery={setQuery} handleSearch={handleSearch} />

      <Container maxWidth="md" sx={{ mt: 12 }}>
        {error && <Typography color="error">{error}</Typography>}

        <Grid container spacing={2} sx={{ mt: 3 }}>
          {loading ? Array.from(new Array(10)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" width="100%" height={250} />
              </Grid>
            )) : movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                <Card>
                  <CardMedia component="img" height="250" image={movie.Poster} alt={movie.Title} />
                  <CardContent>
                    <Typography variant="h6">{movie.Title}</Typography>
                    <Typography variant="body2">{movie.Year}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default MovieSearch;
