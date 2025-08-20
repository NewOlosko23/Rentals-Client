import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [userType, setUserType] = useState("individual");

  // Shared fields
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  // Individual-specific
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  // Company-specific
  const [officialName, setOfficialName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [website, setWebsite] = useState("");

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

      // Build payload based on userType
      let payload = {
        userType,
        email,
        phone,
        password,
        avatarUrl,
        location,
        address,
      };

      if (userType === "individual") {
        payload.username = username;
        payload.fullName = fullName;
      } else {
        payload.officialName = officialName;
        payload.contactPerson = contactPerson;
        payload.website = website;
      }

      const res = await axios.post(
        "https://rentals-server.onrender.com/api/auth/register",
        payload
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
      <div className="max-w-xl mx-auto w-full bg-white p-8 sm:p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Register As
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="individual"
                  checked={userType === "individual"}
                  onChange={() => setUserType("individual")}
                  className="mr-2"
                />
                Individual
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="company"
                  checked={userType === "company"}
                  onChange={() => setUserType("company")}
                  className="mr-2"
                />
                Company
              </label>
            </div>
          </div>

          {/* Individual fields */}
          {userType === "individual" && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johndoe254"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </>
          )}

          {/* Company fields */}
          {userType === "company" && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Official Company Name
                </label>
                <input
                  type="text"
                  value={officialName}
                  onChange={(e) => setOfficialName(e.target.value)}
                  placeholder="Acme Corporation Ltd."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.acmecorp.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
            </>
          )}

          {/* Shared Fields */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254700000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              {userType === "company" ? "Upload Company Logo" : "Upload Avatar"}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e)}
              className="w-full px-2 py-2 border border-gray-300 rounded-lg"
            />
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Preview"
                className="mt-3 w-20 h-20 rounded-full object-cover border"
              />
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Nairobi"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="South B, Nairobi, Kenya"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Passwords */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label className="ml-2 text-gray-700 text-sm">
              I agree to the{" "}
              <a href="#" className="text-gray-900 font-medium hover:underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
          {success && (
            <div className="mb-4 text-green-600 text-sm">{success}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

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
