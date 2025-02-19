import React from "react";
import MovieSearch from "./components/MovieSearch";
import TrendingMovies from "./components/TrendingMovies";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div style={{ margin: 0 }}>
      {/* Navbar */}
      <MovieSearch />

      {/* Trending Movies */}
      {/* <TrendingMovies /> */}

      <Footer /> {/* Add the footer here */}
    </div>
  );
};

export default App;
