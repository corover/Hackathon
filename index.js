const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Tag = require("./tag");
const app = express();
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/co").then(()=>console.log("connected")).catch((err)=>console.log(err))

app.get("/metadata/:id", async (req, res) => {
    try {
        const refid = req.params.id;
        const user = await Tag.findOne({ id: refid });
        if (user) {
            res.send(user);
        } else {
            res.status(400).send("Data not found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/post', async (req, res) => {

    try {
        const tag = new Tag(req.body);
        await tag.save();
        res.status(201).send(tag);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/metadata/:id/tag", async (req, res) => {
    try {
        const postId = req.params.id;
        const { tagId, tag, content } = req.body;

        
        const post = await Tag.findOne({ id: postId });
        if (!post) {
            return res.status(404).send("Post not found");
        }

       
        const newTag = {
            tagId: tagId,
            tag: tag,
            content: content
        };

        
        post.tags.push(newTag);

        
        await post.save();

        res.status(201).send(post);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/metadata/:id/:tagid", async (req, res) => {
    try {
        const refid = req.params.id;
        const tagid = parseInt(req.params.tagid);
        const metadata = await Tag.findOne({ id: refid});
        console.log(metadata.tags)
        const acMetadata = metadata.tags.filter(tag => tag.tagId === tagid);
        console.log(acMetadata)
        if (acMetadata) {
            res.send(acMetadata);
        } else {
            res.status(404).send({ message: "Metadata not found", id: refid, tagid: tagid });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error", error: err.message });
    }
});

app.listen(3000,()=>{
    console.log("running in 3000 port")
})