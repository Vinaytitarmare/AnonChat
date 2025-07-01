import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

// export the login username
let currentUser="NA";

const Login = () => {
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
     const navigate = useNavigate();
       const handleSubmit = async (e) => {
    e.preventDefault();

    const res=await fetch("http://192.168.56.1:5000/api/login",
        {
            method:"POST",
             headers: { "Content-Type": "application/json" },
            body:JSON.stringify({ name, password })
        }
    );
   const data=await res.json()
   if(data.success)
   { localStorage.setItem("token",data.tokenn);
 const username=data.username;
 currentUser=username;
console.log(username)


    console.log("login successful ",data.tokenn)
    navigate("/home")
   }
   else{
    alert(data.message)
   }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-5">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96 ">
        <h2 className="text-2xl font-semibold mb-6 text-center">🔐 Anonymous Login</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              onChange={(e)=>{setName(e.target.value)}}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e)=>{setPassword(e.target.value)}}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-400">
          New here?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
export const getUsername=()=>currentUser;
