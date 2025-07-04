import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ChatroomCard_D from './ChatroomCard_D'
function Delete_Room() {
    const [fetchedroom,setfetchedRoom]=useState([])
    const [reload,reloader]=useState(0)

    const roomFetch=async()=>{
        const rooms=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getRooms?timestamp=${Date.now()}`)
        const data=await rooms.json();
        setfetchedRoom(data.message);

    }
  
 const handlereload=()=>{
    reloader(prev=>prev+1);
    console.log(reload);
    roomFetch();
 }
   useEffect(()=>{
        roomFetch()
    },[reload])
  return (
     <div className="min-h-screen bg-[#0a0f0d] text-gray-100 overflow-x-hidden font-['Fira_Code','Courier_New',monospace]">

{/* return to previous */}
<div className='p-2'>
    <button
  onClick={() => window.history.back()}
  className=" inline-flex items-center gap-2 px-2 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all duration-200 font-mono text-sm"
>
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
 
</button>
</div>


        <main className="relative z-10 container mx-auto px-4 pt-20">
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-gray-300 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Available Rooms
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fetchedroom.map((room) => (
              <ChatroomCard_D
                key={room.roomId} 
                name={room.roomName}
                description={room.roomDes}
                roomId={room.roomId}
                onDeleteSuccess={handlereload}
              />
            ))}
          </div>
        </section>
        </main>
        </div>
  )
}

export default Delete_Room