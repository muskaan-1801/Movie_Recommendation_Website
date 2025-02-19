import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Pagination,
  Box,
  Skeleton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalMovies, Fastfood, LocalDrink } from "@mui/icons-material"; // Icons for Loader
import axios from "axios";
import Navbar from "./Navbar";
import { styled } from "@mui/material/styles";
import NoImageIcon from "../assets/no-image-icon.png"; // Adjusted relative path


const API_KEY = "5ce1ae46"; // Replace with your OMDb API key
const API_URL = "http://www.omdbapi.com/";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  border: `3px solid ${theme.palette.mode === "dark" ? "#8B0000" : "#ADD8E6"}`,
  borderRadius: "10px",
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out, filter 0.3s ease-in-out",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
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

// Footer styled component with default hidden state
const FooterContainer = styled(Box)(({ theme }) => ({
  display: "none",
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: theme.palette.background.default,
  padding: "10px 0",
  textAlign: "center",
  boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)",
  zIndex: 10,
}));

// Pagination styled component
const PaginationContainer = styled(Box)({
  position: "fixed",
  bottom: "50px", // Just above the footer
  right: "20px", // Position it to the bottom right
  zIndex: 1001,
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
  const [footerVisible, setFooterVisible] = useState<boolean>(false);

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

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Check if the user has reached the bottom of the page
    if (scrollY + windowHeight >= documentHeight - 100) {
      setFooterVisible(true);
    } else {
      setFooterVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

      <Container maxWidth="lg" sx={{ mt: 12, paddingLeft: "40px" }}>
        {error && <Typography color="error">{error}</Typography>}

        {/* Card Container with Grid */}
        <Grid container spacing={3} sx={{ mt: 3, justifyContent: "center", padding: 2 }}>
          {/* Show Skeleton Cards while loading */}
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={2.4} sm={2.4} md={2} key={index}>
                  <StyledCard sx={{ height: "100%" }}>
                    <Skeleton variant="rectangular" width="100%" height={0} sx={{ aspectRatio: "1" }} />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Skeleton width="60%" height={20} sx={{ mb: 1 }} />
                      <Skeleton width="40%" height={20} />
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))
            : movies.map((movie, index) => (
                <CardContainer
                  item
                  xs={2.4}
                  sm={2.4}
                  md={2}
                  key={movie.imdbID}
                  isHovered={hoveredIndex === index}
                  isAnyHovered={hoveredIndex !== null}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <StyledCard>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={movie.Poster !== "N/A" ? movie.Poster : NoImageIcon} // Use imported NoImageIcon here
                      alt={movie.Title}
                      sx={{ aspectRatio: "1" }}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6">{movie.Title}</Typography>
                      <Typography variant="body2">{movie.Year}</Typography>
                    </CardContent>
                  </StyledCard>
                </CardContainer>
              ))}
        </Grid>
      </Container>

      {/* Pagination - Positioned at bottom-right just above footer */}
      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "green", // Green color for current page
                color: "white",
              },
            }}
          />
        </PaginationContainer>
      )}
    </ThemeProvider>
  );
};

export default MovieSearch;
