const mongoose=require('mongoose');

const PostSchema=mongoose.Schema(
    {
        userid:{
            type:String,
            required:true
        },
        desc:String,
        likes:[],
        Image:String
    },{timestamps:true}
    )



 const PostModel=mongoose.model("posts",PostSchema);
  
  module.exports=PostModel