const User = require("../../model/user.model");
const { createToken } = require("../../utility/jwt");
const {encryptPw} = require("../../utility/crypt");

const signup = async (req, res) => {
  const { name, email, password} = req.body;
  console.log(name)
  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }
    const hashPw = await encryptPw(password);
    const newUser = await User.create({
      name,
      email,
      password:hashPw
    });
    const token = createToken(email);

    res.cookie("Token", token);

    res.status(200).json({
      message: "User successfully created",
      newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = signup;
