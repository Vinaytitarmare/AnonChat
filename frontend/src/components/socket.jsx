// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://192.168.56.1:5000", {
  transports: ["websocket"], // ensures persistent connection
});

export default socket;
