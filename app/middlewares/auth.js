const { check } = require("express-validator");
const { error } = require("../helpers/responseApi");
const config = require("config");
const jwt = require("jsonwebtoken");

/**
 * Register validation
 */
exports.registerValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Email is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty(),
];

/**
 * Login Validation
 */
exports.loginValidation = [
  check("email", "Email is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty(),
];

/**
 * Get authenticated user data from JWT
 */
exports.auth = async (req, res, next) => {
  const authorizationHeader = req.header("Authorization");
  // Split the authorization header value
  const splitAuthorizationHeader = authorizationHeader.split(" ");

  // Get the type of token and actual token
  const bearer = splitAuthorizationHeader[0];
  const token = splitAuthorizationHeader[1];

  // Check the type
  if (bearer !== "Bearer")
    return res
      .status(400)
      .json(error("The type is must be a Bearer", res.statusCode));

  // Check the token
  if (!token) return res.status(404).json(error("No token found"));

  try {
    const jwtData = await jwt.verify(token, config.get("jwtSecret"));

    // Check the JWT token
    if (!jwtData)
      return res.status(401).json(error("Unauthorized", res.statusCode));

    // If is a valid token that JWT verify
    // Insert the data to the request
    req.user = jwtData.user;

    // Continue the action
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json(error("Unauthorized", res.statusCode));
  }
};
