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
  Snackbar,
  Alert,
  Divider
} from "@mui/material";
import { Brightness4, Brightness7, FilterList } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material";

interface SearchFilters {
  type: string;
  year: number | string;
}

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
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

const FilterButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#333" : "#f5f5f5",
  color: theme.palette.mode === "dark" ? "#fff" : "#000",
  '&:hover': {
    backgroundColor: theme.palette.mode === "dark" ? "#444" : "#e0e0e0",
  },
}));

const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  toggleDarkMode,
  query,
  setQuery,
  handleSearch,
  filters,
  onFilterChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, type: event.target.value };
    onFilterChange(newFilters);
  };

  const handleYearChange = (event: SelectChangeEvent<number | string>) => {
    const newFilters = { ...filters, year: event.target.value };
    onFilterChange(newFilters);
  };

  const handleSearchClick = () => {
    if (query.trim() === "") {
      setOpenSnackbar(true);
    } else {
      handleSearch();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const clearFilters = () => {
    onFilterChange({ type: "", year: "" });
  };

  return (
    <FloatingNavbar position="fixed">
      <Container maxWidth="lg">
        <Toolbar>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
              <LogoText>
                <span>Movie</span>
                <span style={{ fontSize: "32px", color: "gold" }}>Hub!</span>
              </LogoText>
            </Grid>

            {/* Search section */}
            <Grid item xs={12} sm={5}>
              <SearchBox
                variant="outlined"
                size="small"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </Grid>

            {/* Search button */}
            <Grid item xs={6} sm={2}>
              <SearchButton variant="contained" fullWidth onClick={handleSearchClick}>
                Search
              </SearchButton>
            </Grid>

            {/* Filter menu */}
            <Grid item xs={6} sm={1} sx={{ textAlign: "center" }}>
              <FilterButton
                onClick={handleMenuClick}
                startIcon={<FilterList />}
                variant="contained"
                size="small"
              >
                Filters
              </FilterButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: { width: 250, maxHeight: 500 }
                }}
              >
                <MenuItem>
                  <Typography variant="h6">Search Filters</Typography>
                </MenuItem>
                <Divider />

                <MenuItem>
                  <FormControl fullWidth>
                    <RadioGroup
                      value={filters.type}
                      onChange={handleTypeChange}
                      name="type-group"
                    >
                      <FormControlLabel
                        value=""
                        control={<Radio />}
                        label="All Types"
                      />
                      <FormControlLabel
                        value="movie"
                        control={<Radio />}
                        label="Movies Only"
                      />
                      <FormControlLabel
                        value="series"
                        control={<Radio />}
                        label="Series Only"
                      />
                    </RadioGroup>
                  </FormControl>
                </MenuItem>

                <MenuItem>
                  <FormControl fullWidth>
                    <InputLabel>Release Year</InputLabel>
                    <Select
                      value={filters.year}
                      onChange={handleYearChange}
                      label="Release Year"
                    >
                      <MenuItem value="">All Years</MenuItem>
                      {[...Array(currentYear - 1950 + 1)].map((_, index) => (
                        <MenuItem key={1950 + index} value={1950 + index}>
                          {1950 + index}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MenuItem>

                <MenuItem>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={clearFilters}
                    color="primary"
                  >
                    Clear Filters
                  </Button>
                </MenuItem>
              </Menu>
            </Grid>

            {/* Dark mode toggle */}
            <Grid item xs={6} sm={1} sx={{ textAlign: "center" }}>
              <IconButton onClick={toggleDarkMode} color="inherit">
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>

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
