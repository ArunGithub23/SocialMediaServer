const express=require('express');
const { createPost,updatePost,deletePost,likePost,getTimeLinePosts, getPostByUserId, getPost } = require('../Controller/PostController');
const router=express.Router();

router.post('/',createPost)

router.get("/:id",getPost)
router.post("/:id",getPostByUserId)

router.post("/:id",updatePost)
router.post("/:id",deletePost)
router.post("/:id/like",likePost)
router.get("/:id/timeline",getTimeLinePosts)


module.exports=router;