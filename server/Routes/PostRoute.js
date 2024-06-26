const express=require('express');
const { createPost,getPost,updatePost,deletePost,likePost,getTimeLinePosts } = require('../Controller/PostController');
const router=express.Router();

router.post('/',createPost)

router.get("/:id",getPost)
router.put("/:id",updatePost)
router.delete("/:id",deletePost)
router.put("/:id/like",likePost)
router.get("/:id/timeline",getTimeLinePosts)


module.exports=router;