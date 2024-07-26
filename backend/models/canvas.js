const mongoose = require('mongoose');
const DragDropSchema = mongoose.Schema({
    CanvasElements:[{
        type:{
            type:String,
        },
        content:{
            type:String,
        }
    }],
},{
timestamsp:true,
versionKey:false,
})


let Drag = mongoose.model("DragCanvas",DragDropSchema);

module.exports = Drag;