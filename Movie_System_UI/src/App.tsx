import React from "react";
import MovieSearch from "./components/MovieSearch";
import TrendingMovies from "./components/TrendingMovies";

const App: React.FC = () => {
  return (
    <div style={{ margin: 0 }}>
      {/* Navbar */}
      <MovieSearch />

      {/* Trending Movies */}
      <TrendingMovies />
    </div>
  );
};

export default App;
