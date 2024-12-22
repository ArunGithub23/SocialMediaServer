
const express=require('express')
const { createChat, getMessagesById } = require('../Controller/ChatController')


const ChatRoute=express.Router()

ChatRoute.post('/createchat',createChat)
ChatRoute.post('/getmessagesbyid',getMessagesById)


module.exports={ChatRoute}