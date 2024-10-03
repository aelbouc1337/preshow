import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import Navbar from "./components/UI/Navbar.jsx";
import Footer from "./components/UI/Footer.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import BackToTop from "./components/UI/BackToTop.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <BackToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/search/:search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
