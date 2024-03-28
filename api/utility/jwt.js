const jwt = require("jsonwebtoken");


const createToken = (data) => {
  const token = jwt.sign({data}, process.env.TOKENSECRET, {
    expiresIn: "10h",
  });
  return token;
};

const verifyToken = async(token)=>{
  try{
    const verifyUser = await jwt.verify(token,process.env.TOKENSECRET);
    return verifyUser
  }catch(err){
    return null
  }
}
module.exports= {createToken,verifyToken}