const router = require("express").Router();

// Controllers
const {
  register,
  verify,
  login,
  resendVerification,
  getAuthenticatedUser,
} = require("../../app/controllers/api/AuthController");

// Middleware
const {
  registerValidation,
  loginValidation,
  auth,
} = require("../../app/middlewares/auth");

// Routes
router.post("/register", registerValidation, register);
router.get("/verify/:token", verify);
router.post("/login", loginValidation, login);
router.post("/verify/resend", resendVerification);
router.get("/", auth, getAuthenticatedUser);

module.exports = router;
