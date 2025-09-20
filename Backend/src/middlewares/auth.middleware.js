const foodPartnerModel= require("../models/foodPartner.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");


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


async function authUserMiddleware(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)

        const user = await userModel.findById(decoded.id);

        req.user = user

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}
module.exports={
    authFoodPartnerMiddleware,
    authUserMiddleware
}