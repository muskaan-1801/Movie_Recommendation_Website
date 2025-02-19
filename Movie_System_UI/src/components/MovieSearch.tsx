import React, { useState } from "react";
import { CssBaseline, Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Pagination, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalMovies, Fastfood, LocalDrink } from "@mui/icons-material"; // Icons for Loader
import axios from "axios";
import Navbar from "./Navbar";
import { styled } from "@mui/material/styles";

const API_KEY = "7c9f0926"; // Replace with your OMDb API key
const API_URL = "http://www.omdbapi.com/";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  border: `3px solid ${theme.palette.mode === "dark" ? "#8B0000" : "#ADD8E6"}`,
  borderRadius: "10px",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  transition: "transform 0.3s ease-in-out, filter 0.3s ease-in-out",
}));

const CardContainer = styled(Grid)<{ isHovered: boolean; isAnyHovered: boolean }>`
  transition: filter 0.3s ease-in-out, transform 0.3s ease-in-out;
  ${({ isHovered, isAnyHovered }) =>
    isHovered ? "transform: scale(1.08); z-index: 2; filter: none;" : isAnyHovered ? "filter: blur(3px);" : "filter: none;"}
`;

const CenteredLoader = styled(Box)({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#888",
  zIndex: 1000,
});

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

      console.log("API Response:", response.data);

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

      {loading && (
        <CenteredLoader>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Bringing your food...
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Fastfood fontSize="large" />
            <LocalDrink fontSize="large" />
            <LocalMovies fontSize="large" />
          </Box>
        </CenteredLoader>
      )}

      <Container maxWidth="md" sx={{ mt: 12 }}>
        {error && <Typography color="error">{error}</Typography>}

        <Grid container spacing={3} sx={{ mt: 3, justifyContent: "center" }}>
          {movies.map((movie, index) => (
            <CardContainer
              item
              xs={12}
              sm={6}
              md={4}
              key={movie.imdbID}
              isHovered={hoveredIndex === index}
              isAnyHovered={hoveredIndex !== null}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <StyledCard>
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
                  alt={movie.Title}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">{movie.Title}</Typography>
                  <Typography variant="body2">{movie.Year}</Typography>
                </CardContent>
              </StyledCard>
            </CardContainer>
          ))}
        </Grid>

        {totalPages > 1 && (
          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default MovieSearch;
