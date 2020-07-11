const { check } = require("express-validator");

exports.registerValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Email is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty(),
];

exports.loginValidation = [
  check("email", "Email is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty(),
];
