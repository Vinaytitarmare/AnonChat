import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
function ProtectedRoute({children}) {
const navigate=useNavigate();
useEffect(()=>{
  if(!localStorage.getItem("token"))
    navigate("/login") 
},[navigate])

  if(localStorage.getItem("token"))
  return children;


}




export default ProtectedRoute;