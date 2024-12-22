const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    // chatId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, 
    senderId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    recipientId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    message: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, 
  }
);

const ChatModel=mongoose.model("chats",chatSchema);
  
  module.exports=ChatModel