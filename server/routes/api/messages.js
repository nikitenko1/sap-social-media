const router = require('express').Router();
const Message = require('../../models/Message');
const auth = require('../../middleware/auth');

//add new message
router.post('/', auth, async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json({msg: err.message});
  }
});

//get all messages in a conversation
router.get('/:conversationID', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationID,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({msg: err.message});
  }
});

module.exports = router;
