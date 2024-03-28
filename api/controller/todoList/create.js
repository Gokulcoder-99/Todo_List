const User = require("../../model/user.model");

async function create(req, res) {
  const email = req.userVerified.data;
  const taskObj = req.body;
  try {
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Accessing the todos array from userExist object
    const todoArr = userExist.todos;
    todoArr.push(taskObj);

    // Saving the changes to the user document
    await userExist.save();

    res.status(200).json({
      status: "success",
      message: "Task added successfully",
      obj:todoArr[todoArr.length-1],
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
}

module.exports = create;
