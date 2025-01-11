const express=require('express');
const multer=require('multer')

const upload = multer({ storage: multer.memoryStorage() });
const { getUser, updateUser, deleteUser, followUser,unfollowUser, allusers, test, searchuser, updateUserProfile } = require('../Controller/UserController.js');
const uploadToCloudinary = require('../Middleware/uploadCloudanry.js');
const router =express.Router();
// test('x' ,'y')
// allusers('x','y')

router.get("/:id",getUser);
router.post("/allusers",allusers);
router.post("/searchuser",searchuser);

router.post('/updateuser',updateUser)
router.post('/updateuserprofile',upload.single('file'),uploadToCloudinary,updateUserProfile)

router.post('/:id',deleteUser)
router.post('/:id/follow',followUser)
router.post('/:id/unfollow',unfollowUser)



module.exports=router