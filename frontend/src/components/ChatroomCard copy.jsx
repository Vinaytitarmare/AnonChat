import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsername } from './Login';

const ChatroomCard = ({ name, description, roomId }) => {
  const navigate = useNavigate();

  // Debug mount/unmount
  useEffect(() => {
    console.log(`ChatroomCard mounted for room ${roomId}`);
    return () => console.log(`ChatroomCard unmounted for room ${roomId}`);
  }, [roomId]);

  const handleButtonClick = (e) => {
    console.log('--- RAW BUTTON CLICK ---');
    console.log('Event target:', e.target);
    console.log('Current roomId:', roomId);
    e.preventDefault();
    e.stopPropagation();
    enterRoom(roomId);
  };

  const enterRoom = (roomId) => {
    console.log('Attempting to enter room...');
    console.log('roomId:', roomId);
    console.log('Type of roomId:', typeof roomId);
    
    if (!roomId) {
      console.error('No roomId provided!');
      return;
    }

    try {
      const username = getUsername();
      console.log('Username:', username);
      
      const path = `/room/${roomId}?username=${username}`;
      console.log('Navigation path:', path);
      
      navigate(path);
      console.log('Navigation called successfully');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  // Add click handler to parent div as well
  const handleCardClick = () => {
    console.log('Parent div clicked - roomId:', roomId);
    enterRoom(roomId);
  };

  return (
    <div 
      className="relative group w-full max-w-md mx-auto mb-4 overflow-hidden rounded-xl border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10"
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="p-5 flex flex-col h-full">
        {/* ... (other card content remains the same) ... */}
        
        <button
          onClick={handleButtonClick}
          className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-300 flex items-center justify-center space-x-2 group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-teal-600 group-hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          id={`join-button-${roomId}`}
        >
          <span>Join Room</span>
          <svg className="w-4 h-4 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatroomCard;