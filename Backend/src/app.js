const express = require('express');
const cookieparser= require("cookie-parser");
const authRoutes= require("./routes/auth.routes")
const foodRoutes= require("./routes/food.route")
const cors=require('cors')

const app= express();

app.use(cookieparser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Hello WOrld");
    
})

app.use("/api/auth",authRoutes)
app.use("/api/food",foodRoutes)

module.exports=app;


