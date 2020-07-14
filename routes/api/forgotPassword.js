const router = require("express").Router();

// Controllers
const {
  forgot
} = require("../../app/controllers/api/ForgotPasswordController");

// Routes
router.post("/forgot", forgot);

module.exports = router;
