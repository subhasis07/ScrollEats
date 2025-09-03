const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); 


function connectDb(){
    mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Successfully Conntected with DB")
        })
        .catch((err)=>{
            console.error("Not Connected; Error: " + err);
        })
}

module.exports=connectDb;