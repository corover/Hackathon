const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    content_id: { type: String, required: true, unique: true },
    title: { type: String,  },
    description: { type: String, },
    value: { type: String, },
    
});

const tagSchema = new mongoose.Schema({
    tagId:Number,
    tag: { type: String, required: true, unique: true },
    content: [contentSchema]
});

const postSchema = new mongoose.Schema({
    id:Number,
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [tagSchema]  
});

const Tag = mongoose.model('co.ro1', postSchema);
module.exports = Tag;