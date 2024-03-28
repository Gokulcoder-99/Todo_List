const express = require('express');
const app = express();
const cors = require('cors')
const env = require('dotenv');
const connectDB = require("./Db/db");
const authroute = require('./route/authroute');
const vaildCheck = require('./middleware/validCheck');
const userRoute = require('./route/userRoute');

app.use(express.json());
env.config();
app.use(cors());

app.use('/api/auth',authroute)
app.use('/api/user',vaildCheck,userRoute);

const port = process.env.PORT
const server = async()=>{
    try{
       await connectDB()
        app.listen(port,()=>{
            console.log(`${port} is connected`)
        })
    }catch(err){
            console.log(err,'server is not running')
    }
}
server();