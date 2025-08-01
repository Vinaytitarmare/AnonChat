  import React, { useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { getUsername } from './Login';

  const ChatroomCard = ({ name, description, roomId }) => {
    const navigate = useNavigate();

   

    const handleButtonClick =async (e) => {
      
      e.preventDefault();
      e.stopPropagation();
      enterRoom(roomId);
    };

    const enterRoom = async(roomId) => {
    
      
      if (!roomId) {
        console.error('No roomId provided!');
        return;
      }
  const passwordCheck=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/checkPassword?roomId=${roomId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      
    });
    const usernamee = getUsername();
    const ispass= await passwordCheck.json()
    if(ispass.ispassword=="no")
    {
   try {
        
      
        
        // const path = `/room/${roomId}?username=${username}`;
        // console.log('Navigation path:', path);
        
        navigate(`/room/${roomId}`,{
          state:{
            username:usernamee
          }
        });
        // console.log('Navigation called successfully');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
    else if(
      ispass.ispassword=="yes"
    )
    {
      const password=ispass.password;
      const enteredPassword =await window.prompt("This room is private. Enter password to join:");
         if (!enteredPassword) {
        alert("Password is required to enter this room.");
        return;
      }
      else if(enteredPassword==password)
      {
        navigate(`/room/${roomId}`, {
          state: { username: usernamee }
        });
      }
       else {
        alert("Incorrect password!");
    }
    }
  }

   

    // Add click handler to parent div as well
    const handleCardClick = () => {
      // console.log('Parent div clicked - roomId:', roomId);
      enterRoom(roomId);
    };

    return (
      <div 
        className="relative group w-full max-w-md mx-auto mb-4 overflow-hidden rounded-xl border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10"
        onClick={handleCardClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="p-5 flex flex-col h-full">
          {/* Room Header with Name and ID */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white truncate">
                {name || 'Unnamed Room'}
              </h3>
              <p className="text-xs text-green-500 font-mono mt-1 truncate">
                ID: {roomId || 'missing-id'}
              </p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Room Description */}
          <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">
            {description || 'No description provided'}
          </p>
          
          {/* Join Button */}
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