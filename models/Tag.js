const mongoose = require('mongoose');
const TagSchema = mongoose.Schema({
    tag:{
        type:String,
    },
    Value:{
        type:String,
    }
},{
    timestamps:true,
    versionKey:false,

})


let Tag = mongoose.model("Tag",TagSchema);

module.exports = Tag;