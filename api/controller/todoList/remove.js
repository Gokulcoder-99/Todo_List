const User = require("../../model/user.model");

async function remove(req, res) {
  const email = req.userVerified.data;
  const {id} = req.body;
  try {
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    //deleting the todos array from userExist object
    let todoArr = userExist.todos;
    userExist.todos =  todoArr.filter((item) => item._id.toString() !== id )
    
    await userExist.save()

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
      todoArr
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
}
  module.exports = remove