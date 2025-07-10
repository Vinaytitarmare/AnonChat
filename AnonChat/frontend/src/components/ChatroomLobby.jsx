import React, { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import ChatroomCard from "./ChatroomCard";

const ChatroomLobby = () => {
  const navigate = useNavigate();
  const [fetchedroom, setfetchedRoom] = useState([]);

  const fetchRooms = async () => {
    const rooms = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getRooms`);
    const data = await rooms.json();
    console.log("rooms fetched",data)
    setfetchedRoom(data.message);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const [roomName, setRoomName] = useState("");
  const [roomDes, setroomDes] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomPass, setRoomPass] = useState("");


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/createRoom`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomName, roomDes, roomId,password: roomPass  })
    });
    const data=await response.json()
    if (!data.status) {
      alert(data.message);
      setRoomName("");
    setRoomId("");
    setroomDes("");
     setRoomPass("");
      handleClose();
    } else {
      alert("room created!");
    handleClose();

    }
    
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-gray-100 overflow-x-hidden font-['Fira_Code','Courier_New',monospace]">
      {/* Neon Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00ff9d] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00ffe5] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#00fff2] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-4 border-b border-gray-800 bg-black/80 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text">AnonChat</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#111] hover:bg-[#1f1f1f] text-green-400 hover:text-green-300 border border-green-500 rounded-lg shadow-sm hover:shadow-[0_0_10px_#00ff9d] transition-all duration-300 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 container mx-auto px-4 pt-20">
        <section className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Anonymous Chat Rooms</h2>
          <p className="max-w-2xl mx-auto text-gray-400 mb-6">
            "Speak freely, remain unknown. Your identity is protected in our encrypted chat rooms."
          </p>
          <button
            onClick={handleOpen}
            className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-[#00ff9d] to-[#00ffe5] text-black font-medium rounded-full shadow-lg hover:shadow-[0_0_15px_#00ffe5] transition-all duration-300 group"
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
                name={room.roomName}
                description={room.roomDes}
                roomId={room.roomId}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
    {/* <div className="relative w-[90%] max-w-md mx-auto my-8 p-6 bg-[#111] text-white rounded-xl shadow-2xl border border-[#00ff9d]"> */}
     <div className="relative w-[90%] max-w-md mx-auto my-8 max-h-[90vh] overflow-y-auto p-6 bg-[#111] text-white rounded-xl shadow-2xl border border-[#00ff9d] scrollbar-hide">
 
      {/* ❌ Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-[#00ff9d] hover:text-[#00ffe5] text-xl font-bold focus:outline-none transition-all"
        aria-label="Close"
      >
        &times;
      </button>

      <div className="mb-6 text-center">
        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4">
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
            className="w-full px-4 py-3 bg-[#111] border border-[#00ff9d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d]"
            placeholder="e.g. Tech Enthusiasts"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
          <textarea
            value={roomDes}
            onChange={(e) => setroomDes(e.target.value)}
            className="w-full px-4 py-3 bg-[#111] border border-[#00ff9d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d]"
            placeholder="What's this room about?"
            rows="3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Room ID</label>
          <div className="relative">
            <input
              type="number"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-[#00ff9d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d]"
              placeholder="unique-room-id"
              required
            />
          </div>
        </div>
        <div>
  <label className="block text-sm font-medium text-gray-300 mb-1">Room Password (optional)</label>
  <input
    type="password"
    value={roomPass}
    onChange={(e) => setRoomPass(e.target.value)}
    className="w-full px-4 py-3 bg-[#111] border border-[#00ff9d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d]"
    placeholder="Set a password (optional)"
  />
</div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-[#00ff9d] to-[#00ffe5] hover:from-green-500 hover:to-teal-500 text-black font-medium rounded-lg shadow-md transition duration-300"
          >
            Create Room
          </button>
        </div>
      </form>
    </div>
  </Modal>

    </div>
  );
};

export default ChatroomLobby;
