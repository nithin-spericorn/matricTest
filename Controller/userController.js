const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {             
  signUp: async (req, res) => {
      let result;
    try {
      const salt = await bcryptjs.genSalt(10);
      const hash = await bcryptjs.hash(req.body.password, salt);
      const users = {
        name: req.body.name,
        email: req.body.email,
        address:req.body.address,
        password: hash,
        isAdmin:req.body.isAdmin||0
      };
        console.log("hi")
      const exist= await db.user.findOne({ where: { email: req.body.email } });
      if(!exist){
         result = await db.user.create(users);
         
      }else{
        return res.status(400).json({
            success: false,
            message: "user already registered",
          });
      }
      return res.status(200).json({
        success: true,
        message: "user registerd Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }
  },
  login: async (req, res) => {
    try {
      console.log("entered", req.body);
      const user = await db.user.findOne({ where: { email: req.body.email } });
      if (!user) {
        res.status(200).json({
          success: false,
          message: "No User Found",
        });
      } else {
        bcryptjs.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                user_id: user.id,
                isAdmin:user.isAdmin
              },
              "secret",
              {expiresIn:'3d'}
            );
            res.status(200).json({
              success: true,
              message: "authentication successfull",
              token: token,
            });
          } else {
            res.status(200).json({
              success: false,
              message: "invalid credentials",
            });
          }
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }
  },
  profile: async (req, res) => {
    try {
          console.log("user",req.user)
          let email=req.user.email;
          const {user_id,
                 name,
                 address
                   }=await db.user.findOne({where:{email:email}})
            res.status(200).json({
              success: true,
              message: {"userId":user_id,"name":name,"address":address},
            });
          
        }catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }
  },
createmsg:async(req,res)=>{
  try{
    let user=await db.user.findOne({where:{email:req.user.email}})
    const ans=await db.message.create({message:req.body.message,user_id:user.user_id})
    res.status(200).json({
      success:true,
      message:`You are successfully Created a message:${req.body.message}`
    })
  }catch(error){
    res.status(200).json({
      success:true,
      message:"something went wrong"
    })

  }
},

displaymsg:async(req,res)=>{
  try{
    const user=await db.user.findOne({where:{email:req.user.email}})
    const allmsg=await db.message.findAll({where:{user_id:user.user_id}})
    res.status(200).json({
      success:true,
      message:allmsg
   })
  }catch(error){
    res.status(400).json({
      success:false,
      message:"Someting went wrong"
  })
}
},

removeitem:async(req,res)=>{
try{
  let id=req.query.id;
  const rem=await db.message.destroy({where:{message_id:id}})
  res.status(200).json({
    success:true,
    message:'you successfully deleted the message'
  })
}catch(error){
  res.status(400).json({
    success:false,
    message:"Someting went wrong"
                    }) 
             }
 },

updatemsg:async (req,res)=>{
  try{
    console.log("update")
    let id=req.query.id;
    let newmsg=req.body.message;
    console.log(id)
    const ans=await db.message.update({message:newmsg},{where:{message_id:id}})
    const data=await db.message.findByPk(id)
    console.log("message",data,id)
    res.status(200).json({
      success:true,
      message:`you successfully updated message to ${data.message}`
    })
  }catch(error){
    res.status(400).json({
      success:false,
      message:"Someting went wrong"
  })
}
}
}