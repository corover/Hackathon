const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const routes = require('./routes');
const port = 8000;
const mongoURL = "mongodb://localhost:27017/Hackathon";

//Connecting the mongoDB
mongoose.connect(mongoURL).then((connected)=>{
    if(connected){
        console.log("MongoDB got Connected:",mongoose.ConnectionStates.connected);
    }else{
        console.log("Error In Connecting the Database");
    }
})

app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:3000"}));
app.use("/",routes)


app.listen(port,()=>{
    console.log("Server Started in the Port:",port);
})