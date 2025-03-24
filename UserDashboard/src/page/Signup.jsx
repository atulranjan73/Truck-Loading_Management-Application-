import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../Redux/Feature/AuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("driver");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(signupUser({ name, email, password, role }))
      .unwrap()
      .then(() => {
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => toast.error(err || "Signup failed!"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-gray-600 block mb-2">Username</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
              placeholder="Enter your username"
  
            />
          </div>

          <div>
            <label htmlFor="email" className="text-gray-600 block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
              placeholder="Enter your email"
        
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-600 block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-gray-600 block mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
              placeholder="Re-enter your password"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="text-gray-600 block mb-2">Select Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
            >
              <option value="driver">Driver</option>
              <option value="warehouse">Warehouse</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-500"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        <p className="text-center text-gray-600 mt-4">
          Already have an account? {" "}
          <a href="/login" className="text-blue-600 font-semibold">Login</a>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Signup;