import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Button,
  Grid,
  Container,
  Menu,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  Slider,
  Snackbar,
  Alert
} from "@mui/material";
import { Brightness4, Brightness7, Menu as MenuIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material";

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
  marginBottom: 0, // Remove space below the navbar
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
const LogoText = styled(Typography)(({
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
}));

const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  toggleDarkMode,
  query,
  setQuery,
  handleSearch,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [type, setType] = useState<string>("movie");
  const [year, setYear] = useState<number>(2025);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar for empty input
  const currentYear = new Date().getFullYear();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setYear(Number(event.target.value)); // Ensure the value is a number
  };

  const handleYearSliderChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) return;
    setYear(newValue);
  };

  const handleSearchClick = () => {
    if (query.trim() === "") {
      setOpenSnackbar(true); // Show error if input is empty
    } else {
      handleSearch(); // Proceed with search if input is valid
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

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
                onKeyDown={handleKeyPress} // Handle Enter press
              />
            </Grid>

            {/* Search Button */}
            <Grid item xs={6} sm={2}>
              <SearchButton variant="contained" fullWidth onClick={handleSearchClick}>
                Search
              </SearchButton>
            </Grid>

            {/* Filters Dropdown (hover to open) */}
            <Grid item xs={6} sm={1} sx={{ textAlign: "center" }}>
              <IconButton
                onClick={handleMenuClick}
                color="inherit"
                onMouseEnter={handleMenuClick} // Open on hover
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                  onMouseLeave: handleClose, // Close when mouse leaves
                }}
              >
                <MenuItem>
                  <Typography variant="h6">Filters</Typography>
                </MenuItem>

                {/* Type Filter */}
                <MenuItem>
                  <FormControl>
                    <RadioGroup value={type} onChange={handleTypeChange}>
                      <FormControlLabel
                        value="movie"
                        control={<Radio />}
                        label="Movie"
                      />
                      <FormControlLabel
                        value="series"
                        control={<Radio />}
                        label="Series"
                      />
                    </RadioGroup>
                  </FormControl>
                </MenuItem>

                {/* Year Filter */}
                <MenuItem>
                  <FormControl fullWidth>
                    <InputLabel>Year</InputLabel>
                    <Select
                      value={year}
                      onChange={handleYearChange} // Updated to correct type
                      startAdornment={<InputAdornment position="start">Year</InputAdornment>}
                    >
                      {[...Array(currentYear - 1950 + 1)].map((_, index) => (
                        <MenuItem key={1950 + index} value={1950 + index}>
                          {1950 + index}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* Year Slider */}
                    <Slider
                      value={year}
                      onChange={handleYearSliderChange}
                      min={1950}
                      max={currentYear}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => value}
                    />
                  </FormControl>
                </MenuItem>
              </Menu>
            </Grid>

            {/* Dark Mode Toggle */}
            <Grid item xs={6} sm={1} sx={{ textAlign: "center" }}>
              <IconButton onClick={toggleDarkMode} color="inherit">
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>

      {/* Snackbar for empty input */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="error" onClose={() => setOpenSnackbar(false)}>
          Please enter a search query!
        </Alert>
      </Snackbar>
    </FloatingNavbar>
  );
};

export default Navbar;
