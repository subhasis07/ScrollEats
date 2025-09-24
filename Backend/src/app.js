const express = require('express');
const cookieparser= require("cookie-parser");
const authRoutes= require("./routes/auth.routes")
const foodRoutes= require("./routes/food.route")
const foodPartnerRoutes=require("./routes/food-partner.route")
const cors=require('cors')

const app= express();

app.use(cookieparser());

const allowedOrigins = [
  "http://localhost:5173",             // local dev
  "https://scroll-eats.vercel.app",
  "https://scroll-eats-fe.onrender.com/"     // live frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Hello World");
    
})

app.use("/api/auth",authRoutes)
app.use("/api/food",foodRoutes)
app.use('/api/food-partner', foodPartnerRoutes);

module.exports=app;


