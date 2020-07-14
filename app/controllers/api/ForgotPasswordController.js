const { success, error, validation } = require("../../helpers/responseApi");
const { randomString } = require("../../helpers/common");
const User = require("../../models/User");
const Verification = require("../../models/Verification");

/**
 * @desc    Forgot user password
 * @method  POST api/password/forgot
 * @access  public
 */
exports.forgot = async (req, res) => {
  const { email } = req.body;

  // Check the token
  if (!email)
    return res.status(422).json(validation([{ msg: "Email is required" }]));

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    // Check the user
    if (!user)
      return res.status(404).json(error("User not found", res.statusCode));

    // If user exists
    // We're gonna make a new verification data
    let verification = await Verification.findOne({
      userId: user._id,
      type: "Forgot Password"
    });

    // But, we're gonna check the previous verification data is still exist or not
    // If not exist, make a new verificaition data
    if (verification) {
      verification = await Verification.findByIdAndRemove(verification._id);
    }

    // Create a new verification data
    let newVerification = new Verification({
      token: randomString(50),
      userId: user._id,
      type: "Forgot Password"
    });

    // Save the verification data
    await newVerification.save();

    // Send the response
    res
      .status(201)
      .json(
        success(
          "Forgot Password verification has been sent",
          { verification: newVerification },
          res.statusCode
        )
      );
  } catch (err) {
    console.error(err.message);
    res.status(500).json(error("Server error", res.statusCode));
  }
};
