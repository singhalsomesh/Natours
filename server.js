const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

const app = require('./app')

console.log(process.env.NODE_ENV);

const db = process.env.DATABASE;

mongoose.set('strictQuery',false);

mongoose.connect(db).then(() => {
    console.log("database connected successfully");
})

const port = process.env.PORT || 8988;
app.listen(port,() => {
    console.log("port is started on 8988")
})