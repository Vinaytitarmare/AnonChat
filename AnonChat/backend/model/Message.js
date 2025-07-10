// models/Message.js

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    expires: 10800, // 3 hours
  }
});

messageSchema.index({ roomId: 1, timestamp: 1 });

// ✅ Correct export
module.exports = mongoose.model("Message", messageSchema);
