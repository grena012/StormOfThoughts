const express = require('express');
const router = express.Router();
var fetchuser = require('../controller/fetchallusers');
const Quotes = require('../Models/Quotes');
const User = require ('../Models/Users');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all the post using : GET "/api/auth/fetchallposts"
router.get('/fetchallquotes', fetchuser, async (req, res) => {
    try {
        const quotes = await Quotes.find();
        res.json(quotes)
        // console.log(res.json(quotes.length));
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add new post using : POST "/api/posts/addyourquote"
router.post('/addyourquote', fetchuser, [
    body('content', 'Post your thought').isLength({ min: 4 }),
    body('auther',"Auther of content")
], async (req, res) => {

    try {
        const { content, auther } = req.body;

        //If there are errors return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
// console.log("data",req.user);
        const quote = new Quotes({
            
            content, auther, user: req.user.id
            // content, auther
        })
        const savedQuote = await quote.save()
        res.json(savedQuote)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//ROUTE 3: Get all the post of user using : GET "/api/auth/mypost"
router.get('/mypost', fetchuser, async (req, res) => {
    try {
        const quotes = await Quotes.find({ user: req.user.id });
        res.json(quotes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deletepost/:id', fetchuser, async (req, res) => {
    
    try {
    //Find the post to be deleted and delete it
    let post = await Quotes.findById(req.params.id);
    if (!post) { return res.status(404).send("Not Found") }

    //Allow deletion only if userowns this post
    if (post.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    post = await Quotes.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Post has been deleted" , post: post });

} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}

})
//Route 5: For search the related content
router.get("/search/:key",fetchuser, async(req,res) => {
    
    try {
        let quote = await Quotes.find({ 
            "$or":[
                {content:{$regex : req.params.key}}
            ]
           
        })
        res.json(quote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// Route 6: Liked Quotes
router.post('/likepost/:postid/:userid', fetchuser, async (req, res) => {
    
    try {
    const postID = req.params.postid;
    const userID = req.params.userid;

    const postExist = await Quotes.findById(postID);
    const userExist = await User.findById(userID);

    if(!postExist){
        return res.status(400).send("Post not found");
    }
    if(!userExist){
        return res.status(400).send("User not found");
    }
    if(postExist.likedBy.includes(userID)){
        return res.status(400).send("Post already Exist")
    }

    if(postExist.dislikedBy.includes(userID)){
        postExist.dislikedBy.pull(userID);
        postExist.dislikes -= 1;
    }

    postExist.likedBy.push(userID);
    postExist.likes += 1;

    const savedLikes = postExist.save();
    res.status(200).json(savedLikes);

} 
catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}

})
// Route 7: DisLiked Quotes
router.post('/dislikepost/:postid/:userid', fetchuser, async (req, res) => {
    
    try {
    const postID = req.params.postid;
    const userID = req.params.userid;

    const postExist = await Quotes.findById(postID);
    const userExist = await User.findById(userID);

    if(!postExist){
        return res.status(400).send("Post not found");
    }
    if(!userExist){
        return res.status(400).send("User not found");
    }
    if(postExist.dislikedBy.includes(userID)){
        return res.status(400).send("Post already Exist")
    }

    if(postExist.likedBy.includes(userID)){
        postExist.likedBy.pull(userID);
        postExist.likes -= 1;
    }

    postExist.dislikedBy.push(userID);
    postExist.dislikes += 1;

    const savedDislikes = postExist.save();
    res.status(200).json(savedDislikes);

} 
catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}

})

module.exports = router