import React from "react";
import MovieSearch from "./components/MovieSearch";
// import TrendingMovies from "./components/TrendingMovies"; Not Implemented properly
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div style={{ margin: 0 }}>
      {/* Main Searching Area */}
      <MovieSearch /> 
      {/* Normal Footer */}
      <Footer />
    </div>
  );
};

export default App;
