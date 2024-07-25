const express = require('express')
let app=express();

let router=express.Router();
let authRouter = require("./auth/authWork");
let candidateRouter = require("./candidate/candidateWork");


router.use(authRouter);
router.use(candidateRouter);

module.exports=router;
