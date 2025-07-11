
# AnonChat

## Introduction

**AnonChat** is a full-stack, real-time, anonymous chat application. The project enables users to sign up, log in, and join chat rooms where messages are encrypted end‐to‐end. Using a modern React frontend built with Vite and styled with Tailwind CSS, and an Express backend powered by MongoDB and socket.io for real-time communication, AnonChat delivers a secure and engaging chatting experience with full administrator management capabilities.

The project is designed to protect user identities by employing encryption techniques on message data. The application also provides options for room-level password protection and admin-level operations (including room deletion and monitoring) so that chat rooms can maintain their integrity.

## Features

- **Anonymous Login and Signup**  
  Users can create an account or log in without revealing their real identities. The interface makes it easy to get started, and a dedicated admin login is available for room management.
  
- **Real-Time Chat Rooms**  
  Chat rooms are created and joined using socket.io. Messages are exchanged in real time, with encryption applied to ensure all conversations are secured.
  
- **End-to-End Message Encryption**  
  Every message is encrypted using strong AES-256-CBC encryption and decrypted on the client side. This scheme ensures privacy and data protection during transit and storage.
  
- **Room Creation and Management**  
  Users can create custom chat rooms with optional passwords, define a room name and description, and verify the existence of rooms. Administrators have additional privileges such as room deletion and monitoring.
  
- **Responsive and Modern User Interface**  
  The frontend is built using React with Vite as the build tool. Tailwind CSS is used to create an intuitive, responsive design that works across various devices.
  
- **Admin Dashboard**  
  Administrators can log in to an admin dashboard and manage existing chat rooms, including deleting rooms when necessary.

## Requirements

To run AnonChat locally, ensure your system has the following:

### Software
- **Node.js and npm**: Latest stable versions are recommended.
- **MongoDB**: A working instance is required, either locally or via a cloud provider such as MongoDB Atlas.





### Dependencies

#### Backend
- express
- mongoose
- cors
- body-parser
- bcryptjs
- jsonwebtoken
- crypto (native Node module)
- socket.io

#### Frontend
- react and react-dom
- react-router-dom
- socket.io-client
- tailwindcss (with PostCSS and autoprefixer)
- @vitejs/plugin-react
- Material-UI (for modal components)
- Additional utility libraries (jwt-decode, react-toastify, etc.)

A complete list of dependencies can be found in the respective `package.json` files in the backend and frontend directories.

## License

This project is licensed under the **MIT License**. You are free to modify, distribute, and use this code in both personal and commercial projects under the terms of the license.

## Usage

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd AnonChat/backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Ensure your `.env` file is set with the correct `MONGO_URL`, `PORT`, and `ENCRYPTION_SECRET`.

4. Start the backend server:
   ```
   node server.js
   ```
   The backend server will start on the specified port (default is 5000).

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd AnonChat/frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Ensure that the environment variable `VITE_BACKEND_URL` is set in a `.env` file with the backend URL (e.g., `http://localhost:5000`).

4. Start the development server:
   ```
   npm run dev
   ```
   This command launches the Vite development server, allowing you to view the application in your browser.

### Production Build

For a production-ready build, run the following in the frontend directory:
```
npm run build
```
Then, deploy the build output to your preferred static hosting service. The backend is configured to serve static files from the build directory.

------------------------------------------------------------
This README provides a comprehensive overview of the project, covering the essential details on features, setup, and usage that will help developers and users to get started with AnonChat.
