import React, { useEffect, useState } from "react";
// import AnimatedList from '../components/AnimatedList'
// import Listui from "../components/Listui"
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import ChatroomCard from "./ChatroomCard";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ChatroomLobby=()=>{
  const navigate=useNavigate()
  const [fetchedroom,setfetchedRoom]=useState([]);
  const fetchRooms=async()=>{
  const rooms=await fetch("http://192.168.56.1:5000/api/getRooms")
  const data=await rooms.json();


   setfetchedRoom(data.message);
  
}
useEffect(()=>{
fetchRooms();
},[]);
// for chatroom create
  const [roomName, setRoomName] = useState("");
  const [roomDes, setroomDes] = useState("");
  const [roomId, setRoomId] = useState("");
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/login")
  }

  // handle room enter
  // const enterRoom=(roomid)=>{
  //   console.log("room entered",roomid);
  //   // navigate("/room/${roomid}")
  //   navigate(`/room/${roomid}`);

    
  // }

   const handleSubmit =async (e) => {
    e.preventDefault();
   {
      const response=await fetch("http://192.168.56.1:5000/api/createRoom",
        {
            method:"POST",
             headers: { "Content-Type": "application/json" },
            body:JSON.stringify({ roomName, roomDes,roomId })
        }
        
      )
      if(response.status==false)
      {
        alert("Room not created due to unavoidable server error!")
      }
      else{
        alert("room created!")
      }
      handleClose()
      setRoomName("");
      setRoomId("");
      setroomDes("");

    }
  };

    return <>
   <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden">

  {/* Gradient Background Elements */}
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
  </div>

  {/* Header Section */}
  <header className="fixed top-0 left-0 w-full z-50 p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-md">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    {/* Left - Logo */}
    <div className="flex items-center space-x-2">
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">AnonChat</h1>
    </div>

    {/* Right - Logout Button */}
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 rounded-lg shadow-sm hover:shadow-green-500/20 transition-all duration-300 flex items-center space-x-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>Logout</span>
    </button>
  </div>
</header>


  {/* Main Content */}
  <main className="relative z-10 container mx-auto px-4 pt-20">
    {/* Hero Section */}
    <section className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Anonymous Chat Rooms</h2>
      <p className="max-w-2xl mx-auto text-gray-400 mb-6">
        "Speak freely, remain unknown. Your identity is protected in our encrypted chat rooms."
      </p>
      
      {/* Search Bar */}
      {/* <div className="max-w-md mx-auto relative mb-8">
        <input
          type="text"
          placeholder="🔍 Search chat rooms..."
          className="w-full px-5 py-3 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-green-500/10"
        />
      </div> */}
      
      <button
        onClick={handleOpen}
        className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium rounded-full shadow-lg hover:shadow-green-500/30 transition-all duration-300 group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
        <span className="relative flex items-center justify-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Create New Room</span>
        </span>
      </button>
    </section>

    {/* Chat Rooms Grid */}
    <section className="mb-12">
      <h3 className="text-xl font-semibold mb-6 text-gray-300 flex items-center">
        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Available Rooms
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fetchedroom.map((room) => (
          <ChatroomCard
            // key={room.roomId}
            name={room.roomName}
            description={room.roomDes}
            roomId={room.roomId}
          />
        ))}
      </div>
    </section>
  </main>

  {/* Create Room Modal */}
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="w-[90%] max-w-md mx-auto my-8 p-6 bg-gray-800 text-white rounded-xl shadow-2xl border border-gray-700">
      <div className="mb-6 text-center">
        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Create Secret Room</h2>
        <p className="text-sm text-gray-400">Your conversation stays anonymous</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Room Name</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g. Tech Enthusiasts"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
          <textarea
            value={roomDes}
            onChange={(e) => setroomDes(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="What's this room about?"
            rows="3"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Room ID</label>
          <div className="relative">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="unique-room-id"
              required
            />
            <span className="absolute right-3 top-3 text-xs text-gray-400">.anonchat</span>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-medium rounded-lg shadow-md transition duration-300"
          >
            Create Room
          </button>
        </div>
      </form>
    </div>
  </Modal>
</div>
    </>
}
export default ChatroomLobby;