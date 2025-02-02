const express=require('express');
const app=express(); 
const dotenv=require('dotenv')
const cors=require('cors')
require('./Config/dbcon.js')  
const multer=require('multer')
const upload=multer()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// app.use(upload.any())


dotenv.config();
port=process.env.port;

app.use(cors())

//importing routes
const AuthRoute=require('./Routes/AuthRoute.js');
const UserRoute=require('./Routes/UserRoute.js');
const PostRoute=require('./Routes/PostRoute.js')
const UploadRoute=require('./Routes/UploadRoute.js');
const { ChatRoute } = require('./Routes/ChatRoute.js');



//to serve images for public

// app.use(express.static("public"))
// app.use("/images",express.static("images"))



//calling route
app.use('/auth',AuthRoute);
app.use('/user',UserRoute);
app.use('/post',PostRoute);
app.use('/upload',UploadRoute)
app.use('/chat',ChatRoute)



//listening at port
app.listen(port,function(err){
console.log("server is listening on port",port);
if(err){
    console.log("err is ",err);
}
})