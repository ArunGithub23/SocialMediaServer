const express=require('express');
const multer=require('multer')

const upload = multer({ storage: multer.memoryStorage() });
const { createPost,updatePost,deletePost,likePost,getTimeLinePosts, getPostByUserId, getPost, getrecentposts } = require('../Controller/PostController');
const uploadToCloudinary = require('../Middleware/uploadCloudanry');
const router=express.Router();

router.post('/',upload.single('file'),uploadToCloudinary,createPost)
router.get('/getrecentposts',getrecentposts)

router.get("/:id",getPost)
router.post("/:id",getPostByUserId)

router.post("/:id",updatePost)
router.post("/:id",deletePost)
router.post("/:id/like",likePost)
router.get("/:id/timeline",getTimeLinePosts)


module.exports=router;