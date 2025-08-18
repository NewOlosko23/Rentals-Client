import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Listings from "./pages/Listings";
import NotFound from "./pages/NotFound";
import ListingPage from "./pages/ListingPage";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <BackToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listing/:type/:id" element={<ListingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
