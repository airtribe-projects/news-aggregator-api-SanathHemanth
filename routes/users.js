const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyUser = require('../middleware/verifyUser');

const users = [];

router.post("/users/signup",async (req,res) =>{
    const {name,email,password,preferences} = req.body;
    if(!name || !email || !password || !preferences){
        return res.status(400).send({message : 'Invalid data'});
    }
    const hashedpassword = await bcrypt.hash(password,10);
    const user ={name,email,hashedpassword,preferences};
    users.push(user);
    console.log(users);
    res.send('Signup successful');
});

router.post("/users/login",async (req,res)=>{
    const {email,password} = req.body;
    const user = users.find(user=> user.email ===email);
    if(!user){
        return res.status(401).send({message : 'Invalid credentials'});
    }
    const passwordVaild = await bcrypt.compare(password,user.hashedpassword);
    console.log(passwordVaild);
    if(!passwordVaild){
        return res.status(401).send({message : 'Invalid credentials'});
    }
    const token = jwt.sign({email : user.email},process.env.JWT_SECRET);
    //console.log(token);
    res.send({token});
});

//router.use(verifyUser);

router.get("/users/preferences",verifyUser, (req,res)=>{
    const {email} = req.user;
    const user = users.find(user=> user.email ===email);
    if(!user){
        return res.send({message:'Invalid user'});
    }
    res.send({preferences : user.preferences});
});

router.put("/users/preferences",verifyUser, (req,res)=>{
    const {email} = req.user;
    const userData = req.body;
    const user = users.find(user => user.email === email);  
    if(!user){
        return res.send({message : 'Invalid user'});
    }
    user.preferences = userData.preferences;
    res.send({message : 'Preferences updated'});
});


module.exports = { router ,users };