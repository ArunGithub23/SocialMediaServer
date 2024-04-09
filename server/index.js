const express=require('express');
const app=express(); 
const dotenv=require('dotenv')
const cors=require('cors')
require('./Config/dbcon.js')  //connecction to database


app.use(cors())

//importing routes
const AuthRoute=require('./Routes/AuthRoute.js');
const UserRoute=require('./Routes/UserRoute.js');
const PostRoute=require('./Routes/PostRoute.js')
const UploadRoute=require('./Routes/UploadRoute.js')
app.use(express.json())

dotenv.config();
port=process.env.port;

//to serve images for public

app.use(express.static("public"))
app.use("/images",express.static("images"))



//calling route
app.use('/auth',AuthRoute);
app.use('/user',UserRoute);
app.use('/post',PostRoute);
app.use('/upload',UploadRoute)



//listening at port
app.listen(port,function(err){
console.log("server is listening on port",port);
if(err){
    console.log("err is ",err);
}
})