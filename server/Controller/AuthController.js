const UserModel = require("../Models/userModel.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//registering new user
const registerUser = async (req, res) => {
  //console.log("body id",req.body)
  //console.log("useemodel is", UserModel);

  const { username, password, firstname, lastname } = req.body;
  const newUser = new UserModel({ username, password, firstname, lastname });

  try {
    const olduser = await UserModel.findOne({ username });
    console.log("olduser")
    if (olduser) {
      return res.status(400).json({ message: "username already exists" });
    } else {
      const user = await newUser.save();
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_key,
        { expiresIn: "1hr" }
      );
      res.status(200).json({ user, token });
    }
  } catch (error) {
    console.log("register catch",error)
    res.status(500).json({ message: error.message });
  }
};


//login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    
    user = await UserModel.findOne({ username: username });
   // console.log("user",user)
    if (user) {
      if (password == user.password) {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_key,
          { expiresIn: "1hr" }
        );
        res.status(200).json({ user, token });
      } else {
        res.status(400).json("wrong password");
      }
    } else {
      res.status(404).json("User Does Not Exist");
    }
  } catch (error) {
    console.log("login catch",error)
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
