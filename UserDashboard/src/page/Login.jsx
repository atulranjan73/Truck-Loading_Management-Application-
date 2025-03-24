import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Feature/AuthSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Login Successful! Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((err) => toast.error(err || "Login failed!"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="bg-white p-10 rounded-xl shadow-xl w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-600 block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-purple-600"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="text-gray-600 block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-purple-600"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 disabled:bg-gray-500"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <a href="/signup" className="text-purple-600 font-semibold">Sign Up</a>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Login;