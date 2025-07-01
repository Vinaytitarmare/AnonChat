import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import socket from "./socket";
import { useLocation } from "react-router-dom";
const Chatroom = () => {
  const { roomId } = useParams();
 const [validate,validater]=useState("true")
  const [searchParams] = useSearchParams();
  const location=useLocation()
const [username, setUsername] = useState("Anonymous"); // Initialize with default
 useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);
  const [messages, setMessages] = useState([]); // For message history
  const [messageInput, setMessageInput] = useState(""); // For input field

// color regenerate karne ke liye
// Generate sharp neon colors for users
const getUserColor = (senderId) => {
  const colors = [
    'bg-cyan-900 bg-opacity-70 border-l-2 border-cyan-400',
    'bg-purple-900 bg-opacity-70 border-l-2 border-purple-400',
    'bg-green-900 bg-opacity-70 border-l-2 border-green-400',
    'bg-pink-900 bg-opacity-70 border-l-2 border-pink-400',
    'bg-amber-900 bg-opacity-70 border-l-2 border-amber-400',
    'bg-indigo-900 bg-opacity-70 border-l-2 border-indigo-400'
  ];
  const str = String(senderId || "anonymous"); 
 const hash = str.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  return colors[Math.abs(hash) % colors.length];
};

// Format time in 24h format
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("message-history", (history) => {
      setMessages(history);
    });

    socket.on("receive-message", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off("message-history");
      socket.off("receive-message");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    socket.emit("send-message", { 
      roomId, 
      message: messageInput,  // Fixed property name
      sender: username || "Anonymous" 
    });
    setMessageInput(""); // Clear input
  };
const check_roomid=async(roomId)=>{
   const isExist=await fetch(`http://192.168.56.1:5000/api/checkRoom?roomId=${roomId}`,
     {
            method:"GET",
             headers: { "Content-Type": "application/json" }
            
        }
   );
   const data=await isExist.json()
   if(data.status==0){
    // alert("server error")
    validater("false")
   
   }
   else if(data.status==true)
   {  
     validater("true")
    //  alert("true")
   

   }
   else if(data.status==false)
   {
    //  alert("false")
     validater("false")
   
   }

 } 
 useEffect(()=>{
  check_roomid(roomId);
 },[roomId])
 if(validate=="error")
 {
 return(
     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white px-4">
  <div className="bg-gray-900 border border-red-500 rounded-2xl shadow-lg p-8 max-w-md text-center animate-pulse">
    <h1 className="text-3xl font-mono font-bold text-red-500 mb-4">⚠️ 404 - Server Error</h1>
    <p className="text-sm font-mono text-gray-300 mb-6">
      Something went wrong while connecting to the matrix. Please try again later.
    </p>
    <div className="flex justify-center">
      <span className="w-3 h-3 bg-red-500 rounded-full animate-ping mr-2"></span>
      <span className="text-xs font-mono text-red-400">Connection Refused</span>
    </div>
  </div>
</div>

    )
 }
 else if(validate=="true")
 {
  return (
<div className="fixed inset-0 bg-black text-gray-100 flex flex-col">
  {/* Header with glowing accent */}
  <header className="border-b border-gray-800 bg-gradient-to-r from-black to-gray-900 p-4 flex items-center">
    <div className="flex-1">
      <h1 className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
        ANONYMOUS CHATROOM
      </h1>
      <p className="text-xs text-gray-400 font-mono">ROOM: {roomId}</p>
    </div>
    <div className="w-3 h-3 rounded-full bg-green-500 pulse-animation"></div>
  </header>

  {/* Full-screen message container with subtle grid pattern */}
  <div className="flex-1 overflow-y-auto p-4 bg-black bg-opacity-90 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:16px_16px]">
    {messages.map((msg, i) => (
      <div 
        key={i} 
        className={`mb-4 flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
      >
        <div className={`max-w-[80%] rounded-lg p-3 ${getUserColor(msg.sender)}`}>
          {!msg.isCurrentUser && (
            <div className="text-xs font-mono mb-1 opacity-70">
              {msg.sender || 'ANON#' + Math.abs(msg.senderId).toString(16).slice(0,4)}
            </div>
          )}
          <div className="text-sm">{msg.message}</div>
          <div className={`text-xs mt-1 ${msg.isCurrentUser ? 'text-right' : 'text-left'} opacity-50`}>
            {formatTime(msg.timestamp)}
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Input area with sci-fi vibe */}
  <div className="border-t border-gray-800 p-4 bg-black bg-opacity-70 backdrop-blur-sm">
    <div className="flex gap-2 max-w-4xl mx-auto">
      <div className="flex-1 relative">
        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="w-full bg-gray-900 border border-gray-800 focus:border-cyan-400 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white font-mono transition-all"
          placeholder="Type encrypted message..."
        />
        <div className="absolute right-3 top-3 text-xs text-gray-500 font-mono">
          {messageInput.length}/256
        </div>
      </div>
      <button
        onClick={sendMessage}
        disabled={!messageInput.trim()}
        className="px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 disabled:opacity-40 rounded-lg font-mono font-bold transition-all"
      >
        SEND
      </button>
    </div>
  </div>
</div>
  );
 }
 else if(validate=="false")
 {
    return(
     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white px-4">
  <div className="bg-gray-900 border border-yellow-500 rounded-2xl shadow-xl p-8 max-w-md text-center">
    <h1 className="text-2xl font-mono font-bold text-yellow-400 mb-4">⚠️ Invalid Room ID</h1>
    <p className="text-sm font-mono text-gray-300 mb-6">
      This room does not exist in the current dimension. Please double-check the ID or create a new room.
    </p>
    <div className="flex justify-center">
      <span className="w-3 h-3 bg-yellow-400 rounded-full animate-ping mr-2"></span>
      <span className="text-xs font-mono text-yellow-300">Room Not Found</span>
    </div>
  </div>
</div>

    )
 }


};

export default Chatroom;