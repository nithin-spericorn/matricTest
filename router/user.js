const express = require('express')
const router = express.Router();
const userController = require("../Controller/userController");
const { verifyToken ,verifyAdmin} = require('../middleware/veryfyToken');

router.post('/sign-up', userController.signUp);

router.post('/login', userController.login)

router.get("/profile",verifyToken,userController.profile)

router.post("/createmsg",verifyToken, userController.createmsg)

router.put("/msg",verifyToken,userController.updatemsg)

router.delete("/delete",verifyToken,userController.removeitem)

router.get("/display",verifyToken,userController.displaymsg)

module.exports = router;