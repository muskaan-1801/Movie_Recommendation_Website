import React from "react";
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, Grid, Container } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
}

// Floating Wave Animation
const FloatingNavbar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 1100,
  backgroundColor: theme.palette.mode === "dark" ? "#8B0000" : "#ADD8E6",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
  transition: "background 0.5s ease-in-out",
  "&:hover": {
    background: `linear-gradient(45deg, ${theme.palette.mode === "dark" ? "#8B0000" : "#5DADE2"}, ${theme.palette.mode === "dark" ? "#D32F2F" : "#B3E5FC"})`,
  },
}));

// Stylish Search Box with Fix for Dark Mode Placeholder
const SearchBox = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
  color: theme.palette.mode === "dark" ? "#fff" : "#000",
  borderRadius: "8px",
  boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
  width: "100%",
  "& .MuiInputBase-input::placeholder": {
    color: theme.palette.mode === "dark" ? "#bbb" : "#666",
  },
}));

// Styled Search Button (Black in Dark Mode)
const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#000" : "#007BFF",
  color: theme.palette.mode === "dark" ? "#fff" : "#fff",
  fontWeight: "bold",
  boxShadow: "3px 3px 6px rgba(0,0,0,0.4)",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#222" : "#0056b3",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.5)",
  },
}));

// Stylish Logo Text
const LogoText = styled(Typography)({
  fontSize: "26px",
  fontWeight: "bold",
  fontFamily: "cursive",
  textAlign: "center",
  textTransform: "uppercase",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transform: "rotate(-5deg)",
  letterSpacing: "2px",
});

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, query, setQuery, handleSearch }) => {
  return (
    <FloatingNavbar position="fixed">
      <Container maxWidth="lg">
        <Toolbar>
          <Grid container alignItems="center" spacing={2}>
            {/* Fancy Movie Hub Text */}
            <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
              <LogoText>
                <span>Movie</span>
                <span style={{ fontSize: "32px", color: "gold" }}>Hub!</span>
              </LogoText>
            </Grid>

            {/* Search Box */}
            <Grid item xs={12} sm={5}>
              <SearchBox
                variant="outlined"
                size="small"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Grid>

            {/* Search Button */}
            <Grid item xs={6} sm={2}>
              <SearchButton variant="contained" fullWidth onClick={handleSearch}>
                Search
              </SearchButton>
            </Grid>

            {/* Dark Mode Toggle */}
            <Grid item xs={6} sm={2} sx={{ textAlign: "center" }}>
              <IconButton onClick={toggleDarkMode} color="inherit">
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </FloatingNavbar>
  );
};

export default Navbar;
