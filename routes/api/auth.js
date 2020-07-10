const router = require("express").Router();

// Controllers
const {
  register,
  verify,
} = require("../../app/controllers/api/AuthController");

// Middleware
const { registerValidation } = require("../../app/middlewares/auth");

// Routes
router.post("/register", registerValidation, register);
router.get("/verify/:token", verify);

module.exports = router;
