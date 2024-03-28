const User = require("../../model/user.model");
const { createToken } = require("../../utility/jwt");
const { decryptPw } = require("../../utility/crypt");
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({
        message: "User does not  exist",
      });
    }
    const PwFromDb = userExist.password;
    const checkPw = await decryptPw(password, PwFromDb);
    if (!checkPw) {
      return res.status(400).json({
        status: "fail",
        message: "Password is incorrect",
      });
    }

    const token = createToken(email);

    res.status(200).json({
      message: "User successfully logged in",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = login;
