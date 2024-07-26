const express = require('express');
const router = express.Router();
const objectid = require('mongoose').Types.ObjectId;
const Tag = require("./models/Tag");
const Drag = require("./models/canvas");

//Endpoint to give the total tags that is present inside the master data
router.get("/getalltags",async(req,res)=>{
        let tags = await Tag.find({});
        if(tags){
            res.status(200).json(tags);
        }else{
            res.status(404).json({Message:"No Data Found"});
        }
})

//Endpoint to recieve the canvas meta data 
router.post("/canvas",(req,res)=>{
    let {metadata,tags} = req.body;
    if(!metadata){
        res.status(406).json({Message:"Please provive the metadata"});
    }else if(tags.length==0){
        res.status(406).json({Message:"Please provide all the tags data"});
    }else{
        let DependencyCheckArr = [];
        for(let i of tags){
            if(i.Tag === "img"){
                if(!i.Attr){
                    DependencyCheckArr.push(i.Tag);
                }
            }else if(!i.Value){
                DependencyCheckArr.push(i.Tag);
            }
        }
        if(DependencyCheckArr.length>0){
            res.status(406).json({Message:`The Dependency is missing for the following,${DependencyCheckArr.toString()}`})
        }else{
            res.status(200).json({Message:"Canvas is saved"});
        }
    }
})


//Endpoint to send back the canvas
router.get("/getcanvasdata",(req,res)=>{
    let {id} = req.query;   
    if(!objectid.isValid(id)){
        res.status(406).json({Message:"Object Id is not valid"});
    }else{
        Drag.findById(id).then((docs)=>{
            if(docs){
                res.status(200).json(docs);
            }else{
                res.status(404).json({Message:"No Data found"});
            }
        }).catch((err)=>{
            res.status(400).json({Message:"Invalid request",Error:`${err}`});
        })
    }
})



module.exports = router;