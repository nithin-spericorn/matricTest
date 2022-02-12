const express=require("express")
const env=require("dotenv")
const cors=require("cors")
const app=express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const db = require('./models');
db.sequelize.sync({force:false})
  .then(()=> console.log('successfully synced with DB'))
  .catch((err)=> console.log("Sync error", err))

  const user=require("./router/user")
  app.use("/api/user",user)

  // set port, listen for requests
  const port=1229
app.listen(port,()=>{
    console.log(`Localhost server is running at port : ${port}`);
  })