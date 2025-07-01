import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

let currentUser = "NA";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password })
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.tokenn);
      const username = data.username;
      currentUser = username;
      console.log("login successful ", data.tokenn);
      navigate("/home");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-white flex items-center justify-center p-5 font-['Fira_Code','Courier_New',monospace]">
      <div className="bg-[#111] p-8 rounded-xl border border-[#00ff9d] shadow-[0_0_20px_#00ff9d40] w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#00ff9d]">🔐 Anonymous Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#0a0f0d] text-white border border-[#00ff9d] rounded focus:outline-none focus:ring-2 focus:ring-[#00ff9d]"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#0a0f0d] text-white border border-[#00ff9d] rounded focus:outline-none focus:ring-2 focus:ring-[#00ff9d]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#00ff9d] hover:bg-[#00ffe5] text-black font-semibold rounded shadow hover:shadow-[0_0_10px_#00ffe5] transition-all"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-400">
          New here?{" "}
          <Link to="/signup" className="text-[#00ffe5] hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
export const getUsername = () => currentUser;
