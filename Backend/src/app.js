const express = require('express');
const cookieparser= require("cookie-parser");
const authRoutes= require("./routes/auth.routes")

const app= express();

app.use(cookieparser());
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Hello WOrld");
    
})

app.use("/api/auth",authRoutes)


module.exports=app;


