const bcrypt = require("bcrypt");

const encryptPw = async (password) => {
    const hashedPwd = await bcrypt.hash(password, 12);
    return hashedPwd;
  };

  const decryptPw = async (password,PwFromDb) => {
    const isPwValid = await bcrypt.compare(password, PwFromDb);
  return isPwValid ? true : false;
  }
  

  module.exports = {encryptPw,decryptPw}