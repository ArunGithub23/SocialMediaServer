const UserModel=require('../Models/userModel.js')



// searchuser


const searchuser=async(req,res)=>{


    const {searchString}=req.body;
    console.log('searchuser00',searchString);


    try {
        console.log('searchuser01');

        // const searchString = "example"; 
        const users = await UserModel.find({ 
          username: { $regex: searchString, $options: "i" } 
        }).limit(5);
        
        // console.log('allsuers',users);
        

            res.json(users);
      

    } catch (error) {
        res.json(error)
    }
}





// get all users
const allusers=async(req,res)=>{
    console.log('allsuers00');


    try {
        console.log('allsuers1');

        const user=await UserModel.find({});
        // console.log('allsuers',user);
        

        if(user){
            res.json(user);
        }
        else{
            res.json("no such user exists")
        }


    } catch (error) {
        res.json(error)
    }
}




//get user

const getUser=async(req,res)=>{

    const id=req.params.id;

    try {
        console.log("okk1");
        
        const user=await UserModel.findById(id);
        const {password,...otherParameters}=user._doc;

        if(user){
            res.status(200).json(otherParameters);
        }
        else{
            res.status(404).json("no such user exists")
        }


    } catch (error) {
        res.status(500).json(error)
    }
}


//update  user

const updateUser=async(req,res)=>{
    const id=req.params.id;
    const {currentUserId,currentUserAdminStatus,password}=req.body;
    if(id===currentUserId || currentUserAdminStatus){

        try {
            const user=await UserModel.findByIdAndUpdate(id,req.body)
            res.status(200).json(user);

        } catch (error) {
            res.status(500).json(error)
        }


    }

    else{
        res.status(403).json("Access denied! you can only  delete your own profile")
    }
}


//delete user
const deleteUser=async(req,res)=>{

        const id=req.params.id;
        const {currentUserId,currentUserAdminStatus}=req.body;

        if(currentUserId===id ||currentUserAdminStatus){
            try {
                await UserModel.findByIdAndDelete(id);
                res.status(200).json("user Deleted successfully")
            } catch (error) {
                res.status(500).json(error)
            }
        }
        else{
            res.status(403).json("Access denied! you can only  delete your own profile")
        }
        

}


//follow user

const followUser=async(req,res)=>{

    const id=req.params.id;
    const {currentUserId}=req.body;
    console.log("currentuser",currentUserId);
    

    if(currentUserId===id){
        res.status(403).json("Action Forbidden")
    }
    else{
        try {
            
                const followUser=await UserModel.findById(id);
                const followingUser= await UserModel.findById(currentUserId);
                if(!followUser.followers.includes(currentUserId)){
                    await followUser.updateOne({$push :{followers:currentUserId}});
                    await followingUser.updateOne({$push :{following:id}});
                    res.status(200).json("user followed")
                }
                else{
                    res.status(403).json("you already followed the user")
                }

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

//unfollow user

const unfollowUser=async(req,res)=>{

    const id=req.params.id;
    const {currentUserId}=req.body;

    if(currentUserId===id){
        res.status(403).json("Action Forbidden")
    }
    else{
        try {
            
                const followUser=await UserModel.findById(id);
                const followingUser= await UserModel.findById(currentUserId);
                if(followUser.followers.includes(currentUserId)){
                    await followUser.updateOne({$pull :{followers:currentUserId}});
                    await followingUser.updateOne({$pull :{following:id}});
                    res.status(200).json("user unfollowed")
                }
                else{
                    res.status(403).json("you already is not followed the user")
                }

        } catch (error) {
            res.status(500).json(error)
        }
    }
}





module.exports={getUser,updateUser,deleteUser,followUser,allusers,unfollowUser,searchuser}