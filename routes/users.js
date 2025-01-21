const express = require("express");
const router = express.Router();
const fs = require("fs");


router.post("/users/signup",(req,res) =>{
    console.log(req.body);
    const userData = req.body;
    if(!userData.name | !userData.email | !userData.password){
        res.status(400).send({message : "Invalid request"});
    }
    else{
        fs.readFile('./users.json', 'utf-8',(err,jsonSrting)=>{

            if(err){
                console.log("Error in reading file: ",err);
            }
    
            try{
                const jsonData = JSON.parse(jsonSrting);
                if(Array.isArray(jsonData)){
                    jsonData.push(req.body);
                }
                else{
                    console.log("JSON data not an array");
                    return;
                }
    
                const updatedJson = JSON.stringify(jsonData,null,2);
                fs.writeFile('./users.json',updatedJson,(err)=>{
                    if(err){
                        console.log("Error in writing to JSON file: ",err);
                    }
                    else{
                        console.log("Data added successfully");
                    }
                });
            }catch(pasrseErr){
                console.log('Error in pasrsing JSON: ',pasrseErr);
            }
        });
        res.status(200).send("Signup successfull");
    }
    
});

module.exports = router;