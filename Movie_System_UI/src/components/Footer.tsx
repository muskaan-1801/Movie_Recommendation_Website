import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#333", // Background color for the footer
        color: "#fff", // White text color
        padding: "10px 0", // Padding for vertical spacing
        textAlign: "center", // Center the text
        position: "fixed", // Fixed position at the bottom
        bottom: 0, // Position it at the bottom of the screen
        width: "100%", // Make the footer take the full width of the screen
        zIndex: 1100, // Ensure it appears above other content
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} MuskaanMovieHub. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
