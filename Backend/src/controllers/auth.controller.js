const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const foodPartnerModel = require("../models/foodPartner.model");
const { setAuthCookie, clearAuthCookie } = require("../utils/cookie");

dotenv.config();

async function registeruser(req, res) {
  const { fullName, email, password } = req.body;

  const userAlreadyExist = await userModel.findOne({ email });
  if (userAlreadyExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
  setAuthCookie(res, token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
  setAuthCookie(res, token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

function logoutUser(req, res) {
  clearAuthCookie(res);
  res.status(200).json({ message: "User logged out successfully" });
}

async function registerFoodPartner(req, res) {
  const { businessName, contactName, address, phone, email, password } = req.body;

  const partnerAlreadyExist = await foodPartnerModel.findOne({ email });
  if (partnerAlreadyExist) {
    return res.status(400).json({ message: "Partner already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const partner = await foodPartnerModel.create({
    businessName,
    email,
    contactName,
    address,
    phone,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: partner._id }, process.env.JWT_TOKEN);
  setAuthCookie(res, token);

  res.status(201).json({
    message: "Partner registered successfully",
    foodPartner: {
      id: partner._id,
      businessName: partner.businessName,
      email: partner.email,
      contactName: partner.contactName,
      address: partner.address,
      phone: partner.phone,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;
  const foodPartner = await foodPartnerModel.findOne({ email });

  if (!foodPartner) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_TOKEN);
  setAuthCookie(res, token);

  res.status(200).json({
    message: "Partner logged in successfully",
    foodPartner: {
      id: foodPartner._id,
      email: foodPartner.email,
      businessName: foodPartner.businessName,
      contactName: foodPartner.contactName,
      phone: foodPartner.phone,
      address: foodPartner.address,
    },
  });
}

function logoutFoodPartner(req, res) {
  clearAuthCookie(res);
  res.status(200).json({ message: "Food Partner logged out successfully" });
}

module.exports = {
  registeruser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
