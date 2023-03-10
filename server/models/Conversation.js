const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    }, //members[0]-sender members[1]-reciver
  },
  { timestamps: true }
);

const Conversation = mongoose.model('conversation', ConversationSchema);
module.exports = Conversation;
