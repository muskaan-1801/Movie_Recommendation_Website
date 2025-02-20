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
import { LocalMovies, Fastfood, LocalDrink, SentimentDissatisfied } from "@mui/icons-material";
import axios from "axios";
import Navbar from "./Navbar";
import { styled } from "@mui/material/styles";
import NoImageIcon from "../assets/no-image-icon.png";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = "https://www.omdbapi.com/";

// Interface for search filters
interface SearchFilters {
  type: string;
  year: number | string;
}

// Interface for styled card container props
interface CardContainerProps {
  isHovered: boolean;
  isAnyHovered: boolean;
}

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

const CardContainer = styled(Grid)<CardContainerProps>`
  transition: filter 0.3s ease-in-out, transform 0.3s ease-in-out;
  ${({ isHovered, isAnyHovered }) =>
    isHovered
      ? "transform: scale(1.08); z-index: 2; filter: none;"
      : isAnyHovered
      ? "filter: blur(3px);"
      : "filter: none;"}
`;

const ErrorContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "50vh",
  textAlign: "center",
  gap: "20px",
});

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

// Main content wrapper to ensure proper spacing
const MainContent = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  paddingBottom: "120px", // Space for footer and pagination
});

// Updated Container styling
const ContentContainer = styled(Container)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

// Updated Pagination container
const PaginationContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "20px 0",
  marginTop: "auto",
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
  const [filters, setFilters] = useState<SearchFilters>({
    type: "",
    year: "",
  });

  const fetchMovies = async (searchQuery: string, pageNum: number = 1, searchFilters: SearchFilters) => {
    if (!searchQuery) return;
    setLoading(true);
    setError("");

    try {
      const params: any = {
        s: searchQuery,
        page: pageNum,
        apiKey: API_KEY,
      };

      // Add type and year to params if they are set
      if (searchFilters.type) {
        params.type = searchFilters.type;
      }
      if (searchFilters.year) {
        params.y = searchFilters.year;
      }

      const response = await axios.get(API_URL, { params });

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
    fetchMovies(query, 1, filters);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchMovies(query, value, filters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setPage(1);
    fetchMovies(query, 1, newFilters);
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
      <MainContent>
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <ContentContainer maxWidth="lg">
          {error ? (
            <ErrorContainer>
              <SentimentDissatisfied sx={{ fontSize: 80, color: 'grey.500' }} />
              <Typography variant="h4" color="error" gutterBottom>
                OOPS NOT FOUND!!
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {error}
              </Typography>
            </ErrorContainer>
          ) : (
            <Grid
              container
              spacing={4}
              sx={{
                mt: 12,
                justifyContent: "center",
                padding: 2,
              }}
            >
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <StyledCard>
                        <Skeleton variant="rectangular" width="100%" height={0} sx={{ paddingTop: '150%' }} />
                        <CardContent>
                          <Skeleton width="60%" height={20} sx={{ mb: 1 }} />
                          <Skeleton width="40%" height={20} />
                        </CardContent>
                      </StyledCard>
                    </Grid>
                  ))
                : movies.map((movie, index) => (
                    <CardContainer
                      item
                      xs={12} sm={6} md={4} lg={3}
                      key={movie.imdbID}
                      isHovered={hoveredIndex === index}
                      isAnyHovered={hoveredIndex !== null}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <StyledCard>
                        <CardMedia
                          component="img"
                          height="400"
                          image={movie.Poster !== "N/A" ? movie.Poster : NoImageIcon}
                          alt={movie.Title}
                          sx={{ objectFit: "cover" }}
                        />
                        <CardContent sx={{ textAlign: "center" }}>
                          <Typography variant="h6" noWrap title={movie.Title}>
                            {movie.Title}
                          </Typography>
                          <Typography variant="body2">{movie.Year}</Typography>
                        </CardContent>
                      </StyledCard>
                    </CardContainer>
                  ))}
            </Grid>
          )}

{!error && totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: '1.1rem',
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: darkMode ? '#8B0000' : '#ADD8E6',
                  color: darkMode ? 'white' : 'black',
                },
              }}
            />
          </Box>
          )}
        </ContentContainer>
      </MainContent>
    </ThemeProvider>
  );
};

export default MovieSearch;
