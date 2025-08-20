import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Listings from "./pages/Listings";
import NotFound from "./pages/NotFound";
import ListingPage from "./pages/ListingPage";
import Profile from "./pages/Dashboard/Profile";
import Notifications from "./pages/Dashboard/Notifications";
import Post from "./pages/Dashboard/Post";
import Blogs from "./pages/Blogs";
import BlogsPage from "./pages/BlogsPage";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoutes";

function App() {
  return (
    <AuthProvider>
      <Header />
      <ScrollToTop />
      <BackToTop />
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicRoute>
              <Contact />
            </PublicRoute>
          }
        />

        {/* Private route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/notifications"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/post-property"
          element={
            <PrivateRoute>
              <Post />
            </PrivateRoute>
          }
        />

        {/* Always accessible */}
        <Route path="/about" element={<About />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listing/:transactionType/:id" element={<ListingPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
