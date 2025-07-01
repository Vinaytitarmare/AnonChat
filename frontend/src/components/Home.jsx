import React from "react";
import { Navigate,useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const nav=()=>{
    navigate("/lobby")
  }
  return (
    <div className="min-h-screen bg-black text-white flex flex-col  items-center justify-center">
     
   <div className="flex flex-col justify-center items-center min-h-screen bg-black px-4 text-center">
  <h1 className="text-2xl md:text-4xl font-bold text-green-400 mb-8">
    👋 Welcome to Anonymous Chat!
  </h1>
  <h1
    className="text-lg md:text-2xl font-bold px-6 py-3 rounded-md border-2 border-green-500 text-green-400 
               bg-gray-900 shadow-lg hover:shadow-green-500/50 cursor-pointer 
               transition-all duration-300 hover:scale-105 relative overflow-hidden"
    onClick={nav}
  >
    <span className="animate-pulse">Go Anonymous!!</span>
  </h1>
</div>


    </div>
  );
};

export default Home;
