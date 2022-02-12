const jwt=require("jsonwebtoken")
const db=require("../models")
const env = require("dotenv").config();


module.exports = {
    verifyToken : (req, res, next) => {
      console.log("s",process.env.SECRET)
        const authHeader=req.headers.token;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.SECRET, (err, user) => {
              if (err) res.status(403).json("Token is not valid!");
              req.user = user;
              next();
            });
          } else {
            return res.status(401).json("You are not authenticated!");
          }
        },
        verifyAdmin:(req,res,next)=>{
          if(req.user.isAdmin===1){
            next()
          }else{
            return res.status(401).json("You are not Admin!");
          }
        }

       
  };