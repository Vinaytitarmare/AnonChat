import React from 'react'
import { useNavigate } from 'react-router-dom'
function AdminDashboard() {
  const navigate=useNavigate()
    const deleteRoom=()=>{
     navigate("/admin/deleteRoom")
    }
  return (
   <div className="min-h-screen bg-[#0a0f0d] text-gray-100 overflow-x-hidden font-['Fira_Code','Courier_New',monospace]">
        
       <button
  onClick={deleteRoom}
  className="px-5 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition-all duration-200 font-mono text-sm uppercase tracking-wider"
>
  View Rooms
</button>


    </div>
  )
}

export default AdminDashboard