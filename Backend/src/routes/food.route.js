const express = require('express');
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
})

// "/api/food" + "/" + protected API
router.post("/",
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood
)

// Public route → anyone can see food items (homepage)
router.get("/",
    foodController.getFoodItems
)

// Protected routes
router.post('/like',
    authMiddleware.authUserMiddleware,
    foodController.likeFood
)

router.post('/save',
    authMiddleware.authUserMiddleware,
    foodController.saveFood
)

router.get('/save',
    authMiddleware.authUserMiddleware,
    foodController.getSaveFood
)

module.exports = router
