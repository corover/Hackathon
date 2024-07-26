const mongoose = require('mongoose');
const TagSchema = mongoose.Schema({
    type:{
        type:String,
    },
    content:{
        type:String,
    }
},{
    timestamps:true,
    versionKey:false,

})


let Tag = mongoose.model("Tag",TagSchema);

module.exports = Tag;