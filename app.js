require("dotenv").config()
const express = require('express')
const app = express();
const userRouter = require("./api/users/user.router")

app.use(express.json());

app.get("/api",(req, res)=>{
    res.json({
        success: 1,
        message: "This REST API was developed by Bamidele Moses O. using NodeJS, Express & MySQL"
    })
})

app.use("/api/users", userRouter)

app.listen(process.env.APP_PORT,()=>{
    console.log("Server running on: ",process.env.APP_PORT);
})