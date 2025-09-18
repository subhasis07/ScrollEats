const express= require('express');
const foodController= require("../controllers/food.controller")
const authMiddleware = require("../middlewares/auth.middleware");
const router= express.Router();
const multer = require("multer");

const upload= multer({
    storage:multer.memoryStorage(),
})


//"/api/food"+ "/" + protected API
router.post("/", 
    authMiddleware.authFoodPartnerMiddleware, 
    upload.single("video") ,
    foodController.createFood)

router.get("/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems)


module.exports=router