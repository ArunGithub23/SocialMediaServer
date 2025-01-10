const PostModel=require('../Models/postModel.js');
const UserModel=require('../Models/userModel.js')
const mongoose =require('mongoose')



//create Post
 const createPost=async (req,res)=>{
    // console.log("createpost controller",req.body,req.cloudinaryResult)
   // console.log("body",req.body)
    const {userid,desc,}=req.body
   const  Image=req.cloudinaryResult.url
   const data={userid,desc,Image}

    const newPost=new PostModel(data);

    try {

       const post= await newPost.save() 

        res.status(200).json(post)
    } catch (error) {
            res.status(500).json(error)   
    }

}



//get post
const getPostByUserId=async(req,res)=>{

        const id=req.params.id;
        console.log("param post",id);
        
        try {
            const post=await PostModel.find({userid:id})
            console.log("posts are",post);
            
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json(error)
        }

}

//getpost by postid
const getPost=async(req,res)=>{

    const id=req.params.id;
    console.log("param post",id);
    
    try {
        const post=await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }

}



//update post
const updatePost=async(req,res)=>{

    const postId=req.params.id;
    const {userId}=req.body

    try {
        const post=await PostModel.findById(postId);
        if(post.userId===userId){
            await post.updateOne({$set :req.body})
            res.status(200).json("post updated")
        }
        else{
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.status.json(error)
    }
}



//delete post
const deletePost=async(req,res)=>{
    const id=req.params.id;
    const {userid}=req.body
    console.log("id",id,userid);
    

    try {
        const post=await PostModel.findById(id)
        if (post.userid==userid) {
            await post.deleteOne();
            res.status(200).json({msg:"post deleted",statuscode:200})
            
        } else {
            res.status(403).json({msg:"Action Forbidden",statuscode:403})
        }


    } catch (error) {

        console.log(error)
        res.status(500).json({msg:"Internal server error",statuscode:500})

    }
}


// like unklike post

const likePost=async(req,res)=>{

        const id=req.params.id
        const {userid}=req.body


        try {
            
                const post=await PostModel.findById(id)
                if (!post.likes.includes(userid)) {
                    await PostModel.updateOne({$push:{likes:userid}})
                     res.status(200).json("Post liked")   
                } else {
                    await post.updateOne({$pull:{likes:userid}})
                     res.status(200).json("Post unliked") 
                }

        } catch (error) {
         res.status(403).json(error)   
        }

}



//getTimeLinePosts

const getTimeLinePosts=async(req,res)=>{
    
    

    const userid=req.params.id
    console.log("userid",userid)

    try {
        const currentUserPosts=await PostModel.find({userid:userid})
       // console.log("posts are",currentUserPosts)
        const followingPosts=await UserModel.aggregate([
            {
                $match:{
                    _id:userid
                }

            },
            {
                $lookup:{
                    from :"posts",
                    localField:"following",
                    foreignField:"userid",
                    as:"followingPosts"
                }
            },
            {
                $project:{
                    followingPosts:1,
                    _id:0
                }
            }
        ])

       // console.log("follwingpost",followingPosts)

        res.status(200).json(currentUserPosts.concat(followingPosts))

    } catch (error) {
        console.log("catch",error)
        res.status(500).json(error)
    }

}


const getrecentposts=async(req,res)=>{

    // console.log("okk1recnt");
    

    try {
        // console.log("okk2");

        const result=await PostModel.find().sort({ createdAt: -1 }).limit(10);
        // console.log("okk3");

        res.send({result,statuscode:200})
    } catch (error) {
        // console.log("okk4");

        console.log(error);
        
        res.send({msg:'got an error while finding the recent posts',error})
    }
}
module.exports={createPost,getPostByUserId,getPost,updatePost,deletePost,likePost,getTimeLinePosts,getrecentposts}