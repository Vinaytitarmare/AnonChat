import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");

     const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://192.168.56.1:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
    }
  };
    
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-5">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">🆕 Create Account</h2>
      <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              placeholder="Choose a name"
              onChange={(e)=>{setName(e.target.value)}}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder="Choose a password"
              onChange={(e)=>{setPassword(e.target.value)}}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded font-semibold"
          >
            Signup
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
