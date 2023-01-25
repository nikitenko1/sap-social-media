const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conversation',
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
