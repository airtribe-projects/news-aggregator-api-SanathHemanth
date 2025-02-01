const express = require('express');
const router = express.Router();
const axios = require('axios');
const userRouter= require('./users');
const verifyUser = require('../middleware/verifyUser');

router.get('/news',verifyUser, async (req,res)=>{
    const {email} = req.user;
    const user = userRouter.users.find(user => user.email === email);
    if(!user){
        return res.send({message:'Invalid user'});
    }
    const apiKey = process.env.API_KEY;
    //const apiKey = '0cfde0bdb39d4411a19ca635b4d78db4';
    const baseURl = 'https://newsapi.org/v2/top-headlines';
    try{
        const response = await axios.get(baseURl,{
            params:{
                category : user.preferences,
                apiKey : apiKey
            }
        });
        //console.log('News: ',response.data.articles);
        res.send(response.data.articles);
    }catch(error){
        console.log('error in fethching news: ',error.response ? error.response.data : error.message);
    }    
    

});

module.exports = router;