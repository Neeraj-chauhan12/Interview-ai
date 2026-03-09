const User = require("../models/userModel");
const BlackListed=require("../models/BlackListed")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");       

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {

    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    const existUser = await User.find({
      $or: [{ username: username }, { email: email }],
    });

    if (existUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const Hashed=await bcrypt.hash(password,10);

    const newUser=new User({
        username,
        email,
        password:Hashed
    })
    await newUser.save();

    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({ message: "User registered successfully", token, user: newUser });

  } catch (error) {
    console.error("Error checking existing user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



exports.login=async(req,res)=>{
    const {email,password}=req.body;
    try {

        const user=await User.findOne({email:email})
        if(!user){
            return res.status(400).json({message:"Invalid email or password"})
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"})
        }  
        
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({message:"Login successful",token,user})
        
    } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).json({ message: "Server error" });
        
    }
}


exports.logout=async(req,res)=>{
    const token=req.cookies.token;  
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }   

    if(token){
        await BlackListed.create({token})
        res.clearCookie("token");
        return res.status(200).json({message:"Logout successful"})
    }
}