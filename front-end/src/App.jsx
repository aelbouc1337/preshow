import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import Navbar from "./components/UI/Navbar.jsx";
import Footer from "./components/UI/Footer.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import BackToTop from "./components/UI/BackToTop.jsx";
import Explorer from "./pages/Explorer.jsx";
import TvShowPage from "./pages/TvShowPage.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <BackToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/tv/:id" element={<TvShowPage />} />

        <Route path="/search/:search" element={<SearchPage />} />
        <Route path="/explorer" element={<Explorer />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
