import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!agree) {
      setError("You must agree to the terms and conditions.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://rentals-server.onrender.com/api/auth/register",
        { name, email, phone, password }
      );

      if (res.data?.user) {
        login({
          ...res.data.user,
          token: res.data.token,
        });
      }

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-16 px-4 mt-14">
      <div className="max-w-lg mx-auto w-full bg-white p-8 sm:p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Create Your Account
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-green-600 text-sm text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="name"
            >
              Full Name
            </label>
            <p className="text-gray-400 text-sm mb-1">
              Enter your full name as you want it displayed.
            </p>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <p className="text-gray-400 text-sm mb-1">
              Enter a valid email address.
            </p>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <p className="text-gray-400 text-sm mb-1">
              Enter a valid phone number.
            </p>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254700000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <p className="text-gray-400 text-sm mb-1">
              Must be at least 8 characters long.
            </p>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <p className="text-gray-400 text-sm mb-1">
              Re-enter your password for verification.
            </p>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4 text-gray-900 focus:ring-gray-400 border-gray-300 rounded"
            />
            <label htmlFor="agree" className="ml-2 text-gray-700 text-sm">
              I agree to the{" "}
              <a href="#" className="text-gray-900 font-medium hover:underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gray-900 text-white py-3 cursor-pointer rounded-lg font-medium hover:bg-gray-800 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-gray-900 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
