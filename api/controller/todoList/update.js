const User = require("../../model/user.model");

async function update(req, res) {
  const email = req.userVerified.data;
  const {id,task,completed} = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    //updating the todos array from userExist object
    let todoArr = userExist.todos;
    todoArr.find((item) =>{
      if(item._id.toString()==id){
        item.task = task || item.task
        item.completed = completed !== undefined? completed : item.completed;
      }
    })
   await userExist.save()

    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      todoArr,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
}
  module.exports = update