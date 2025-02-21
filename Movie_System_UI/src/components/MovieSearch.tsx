import React, { useState } from "react";
import {
  CssBaseline,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
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

interface SearchFilters {
  type: string;
  year: number | string;
}

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
  gap: "20px",
  color: "#888",
  zIndex: 1000,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
});

const MainContent = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  paddingBottom: "120px", // Space for footer and pagination
});

const ContentContainer = styled(Container)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const IconWrapper = styled('div')({
  display: "flex",
  gap: "20px",
  '& .icon': {
    animation: "bounce 1s infinite",
  },
  '& .icon-1': {
    animationDelay: '0s',
  },
  '& .icon-2': {
    animationDelay: '0.2s',
  },
  '& .icon-3': {
    animationDelay: '0.4s',
  },
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

  const handleCardClick = (imdbID: string) => {
    window.open(`https://www.imdb.com/title/${imdbID}`, '_blank');
  };

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
          {loading && (
            <CenteredLoader>
              <IconWrapper>
                <div className="icon icon-1">
                  <LocalMovies sx={{ fontSize: 40, color: "#ff6b6b" }} />
                </div>
                <div className="icon icon-2">
                  <Fastfood sx={{ fontSize: 40, color: "#ffd93d" }} />
                </div>
                <div className="icon icon-3">
                  <LocalDrink sx={{ fontSize: 40, color: "#6c5ce7" }} />
                </div>
              </IconWrapper>
              <Typography variant="h6" sx={{ color: "#333", fontWeight: "bold" }}>
                Loading...
              </Typography>
            </CenteredLoader>
          )}

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
                      <StyledCard onClick={() => handleCardClick(movie.imdbID)}>
                      <Box sx={{ 
                        position: 'relative',
                        paddingTop: '150%', // This maintains a 2:3 aspect ratio
                        width: '100%',
                        overflow: 'hidden'
                      }}>
                        <CardMedia
                          component="img"
                          image={movie.Poster !== "N/A" ? movie.Poster : NoImageIcon}
                          alt={movie.Title}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                      <CardContent sx={{ 
                        textAlign: "center",
                        flexGrow: 1, // This ensures the content takes up remaining space
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}>
                        <Typography 
                          variant="h6" 
                          noWrap 
                          title={movie.Title}
                          sx={{
                            fontSize: '1rem',
                            lineHeight: 1.2,
                            mb: 1
                          }}
                        >
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
