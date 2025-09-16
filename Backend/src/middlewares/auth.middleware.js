const foodPartnerModel= require("../models/food.model");
const jwt = require("jsonwebtoken")


async function authFoodPartnerMiddleware(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Please Authenticate first"
        })
    }

    try {
        const decodedToken= jwt.verify(token,process.env.JWT_TOKEN);

        const foodPartner= await foodPartnerModel.findById(decodedToken.id);

        req.foodPartner=foodPartner;

        next();
    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports={
    authFoodPartnerMiddleware
}