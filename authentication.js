const mongoose = require('mongoose');
require('dotenv').config();
const UserModel = require('../Models/authenticationModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || "Muhammad_hasnain_khan";
const connectDB = require('../dbConnect/connectDB');

connectDB();

const authentication = {
signup: async (req, res) => {
  try {
    const { name, password, email, gender, phone, confirmPassword } = req.body;
    
    const userExist = await UserModel.findOne({ $or: [{ name }, { email }] });

    if (userExist) {
      return res.status(400).send({ message: "Username or email already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, password: hashedPassword, gender, phone, email });
    await newUser.save();

    res.status(201).send({ message: "User registered successfully", data: newUser });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).send({ message: "User registration failed", error });
  }
},

login: async (req, res) => {
  try {
   const {email, password} = req.body;
   const existUser = await UserModel.findOne({email});
   if(existUser){
     const correctPass = await bcrypt.compare(password, existUser.password);
     if(correctPass){
       const token =  jwt.sign({...existUser.toJSON()}, SECRET_KEY)
       res.send({
         message: "Signin Succesfully",
         token, 
         user: existUser})
       }
       else{
         res.send({message: "invalid password"})
         
       }
     } else {
       res.status(401).send({message: "This email user not found"})
  }
  } catch (error) {
     res.status(500).send({message: "Internal server failed", error})
    
  }
},
         
protected: async (req, res,next) => {
 const token = req.headers.authorization?.split(" ")[1];

 if(!token){
   return res.status(401).send({message: "unvalid token"});
   
 } else{
  jwt.verify(token, SECRET_KEY, (error, decoded) => {
   if(error){
     return res.send({message: "Un Authorized"})
   } else {
     next();
   
   }
  })

 }
}

};

module.exports = authentication;
