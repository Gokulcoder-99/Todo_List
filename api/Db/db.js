const mongoose = require('mongoose');

const connectDB =async()=>{
  try{
    await mongoose.connect(process.env.DB)
  console.log('DB connected')
}catch(err){
  console.log(err,'DB is not connected!!!')
}
}

module.exports= connectDB