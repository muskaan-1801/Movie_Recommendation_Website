//not working

// import React, { useState, useEffect } from "react";
// import { Container, Box, Card, CardMedia, Typography } from "@mui/material";
// import axios from "axios";
// import { styled } from "@mui/material/styles";

// const API_KEY = "7c9f0926"; // Replace with your OMDb API key
// const API_URL = "http://www.omdbapi.com/";

// // Styling for the carousel container
// const CarouselContainer = styled(Box)(({ theme }) => ({
//   width: "100vw", // Carousel should take up the entire width of the screen
//   overflow: "hidden", // Hide anything outside the container's bounds
//   position: "relative",
//   height: "450px", // Adjust the height to make it more compact
//   paddingTop: "10px", // Reduced padding-top to bring the carousel closer to the content
// }));

// // Styling for the movie slider (with smoother animation and continuous movement)
// const MovieSlider = styled(Box)(({ theme }) => ({
//   display: "flex",
//   gap: "20px", // Space between cards
//   animation: "slide 36s infinite linear", // Continuous linear animation for smooth loop
//   "@keyframes slide": {
//     "0%": {
//       transform: "translateX(0)", // Start position
//     },
//     "100%": {
//       transform: "translateX(-100%)", // End position (move completely to the left)
//     },
//   },
// }));

// // Styling for individual movie cards (with larger size and smooth transition)
// const StyledCard = styled(Card)(({ theme }) => ({
//   position: "relative",
//   width: "300px", // Larger width for the cards
//   height: "400px", // Fixed height for the cards
//   borderRadius: "12px", // Rounded corners for a modern look
//   boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Soft shadow for better visibility
//   overflow: "hidden",
//   transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//   transform: "scale(1)", // No rotation
//   "&:hover": {
//     transform: "scale(1.05)", // Slight zoom-in effect
//     boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)", // Enhanced shadow on hover
//   },
// }));

// // Styling for movie details that appear on hover
// const MovieDetails = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   background: "rgba(0, 0, 0, 0.7)", // Dark overlay
//   color: "#fff",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   opacity: 0,
//   transition: "opacity 0.3s ease-in-out",
//   "&:hover": {
//     opacity: 1, // Fade in details on hover
//   },
//   padding: "10px",
// }));

// const MovieSliderComponent: React.FC = () => {
//   const [movies, setMovies] = useState<any[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(API_URL, {
//           params: {
//             s: "action", // Adjust the query to your needs
//             apiKey: API_KEY,
//             page,
//           },
//         });

//         if (response.data.Response === "True") {
//           setMovies((prevMovies) => [...prevMovies, ...response.data.Search]);
//         }
//       } catch (err) {
//         console.error("Error fetching movies:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, [page]); // This hook depends on the 'page' state

//   useEffect(() => {
//     if (movies.length > 0 && !loading) {
//       setPage((prevPage) => prevPage + 1); // Only increment the page if movies are fetched
//     }
//   }, [movies, loading]); // Depend on both 'movies' and 'loading' states

//   // We will clone the first few movies to create a smooth loop
//   const movieCount = 15;
//   const movieList = [...movies.slice(0, movieCount), ...movies.slice(0, movieCount)];

//   return (
//     <Container sx={{ padding: 0 }}>
//       <CarouselContainer>
//         <MovieSlider>
//           {movieList.map((movie, index) => (
//             <StyledCard key={index}>
//               <CardMedia
//                 component="img"
//                 height="100%" // Make the image fill the height of the card
//                 width="100%" // Ensure the image fills the card's width
//                 image={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
//                 alt={movie.Title}
//               />
//               <MovieDetails>
//                 <Box sx={{ textAlign: "center", padding: "10px" }}>
//                   <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
//                     {movie.Title}
//                   </Typography>
//                   <Typography variant="body2">{movie.Year}</Typography>
//                   <Typography variant="body2">{movie.Type.toUpperCase()}</Typography>
//                 </Box>
//               </MovieDetails>
//             </StyledCard>
//           ))}
//         </MovieSlider>
//       </CarouselContainer>
//     </Container>
//   );
// };

// export default MovieSliderComponent;
