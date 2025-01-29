const jwt = require("jsonwebtoken");

const verifyUser = (req,res,next) =>{
    const auth = req.headers["authorization"];
    console.log(auth);
    if(!auth || !auth.startsWith("Bearer ")){
        return res.status(401).send({message : 'Access Denied'});
    }
    const token = auth.split(" ")[1];
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decodedToken;
    console.log(decodedToken);
    next();
};

module.exports = verifyUser;