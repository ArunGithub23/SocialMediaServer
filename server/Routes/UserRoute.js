const express=require('express');
const { getUser, updateUser, deleteUser, followUser,unfollowUser, allusers, test, searchuser } = require('../Controller/UserController.js');
const router =express.Router();
// test('x' ,'y')
// allusers('x','y')

router.get("/:id",getUser);
router.post("/allusers",allusers);
router.post("/searchuser",searchuser);

router.post('/:id',updateUser)
router.post('/:id',deleteUser)
router.post('/:id/follow',followUser)
router.post('/:id/unfollow',unfollowUser)



module.exports=router