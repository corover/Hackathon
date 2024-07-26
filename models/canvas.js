const mongoose = require('mongoose');
const DragDropSchema = mongoose.Schema({
    MetaData: {
        type:String,
    },
    CanvasElements:[{
        tag:{
            type:String,
        },
        Value:{
            type:String,
        }
    }],
},{
timestamsp:true,
versionKey:false,
})


let Drag = mongoose.model("DragCanvas",DragDropSchema);

module.exports = Drag;