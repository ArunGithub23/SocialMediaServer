const ChatModel = require('../Models/chatModel'); // Assuming the Chat model is in the `models` directory

const createChat = async (req, res) => {
  try {
    const { senderid, recipient, message } = req.body;

    // console.log('req is',req.body);
    

    // Validate required fields
    if (!senderid || !recipient || !message) {
      return res.status(400).send({ message: 'senderid, recipient, and message are required.' });
    }

    // Create a new chat document
    const newChat = new ChatModel({
      senderId: senderid, 
      recipientId: recipient, 
      message: message,
    });

    // Save to the database
    const savedChat = await newChat.save();

    res.status(201).send({ message: 'Chat inserted successfully', chat: savedChat });
  } catch (error) {
    console.error('Error while creating chat:', error);
    res.status(500).send({ message: 'Got an error while creating chat', error });
  }
};



//getMessagesById

const getMessagesById = async (req, res) => {
  try {
    const { senderid, recipient } = req.body;

    // Validate required fields
    if (!senderid || !recipient) {
      return res.status(400).send({ message: 'senderid and recipient are required.' });
    }

    // Query to fetch messages between sender and recipient (both directions)
    const messages = await ChatModel.find({
      $or: [
        { senderId: senderid, recipientId: recipient },
        { senderId: recipient, recipientId: senderid },
      ],
    }).sort({ createdAt: 1 }); // Sort messages by createdAt (oldest to newest)

    res.status(200).send({ messages });
  } catch (error) {
    console.error('Error while fetching messages:', error);
    res.status(500).send({ message: 'Got an error while fetching messages', error });
  }
};


module.exports = {createChat,getMessagesById}
