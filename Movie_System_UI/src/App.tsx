import React from "react";
import { Routes, Route } from "react-router-dom";
import MovieSearch from "./components/MovieSearch";
import Home from "./components/Home";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div style={{ margin: 0 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<MovieSearch />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;