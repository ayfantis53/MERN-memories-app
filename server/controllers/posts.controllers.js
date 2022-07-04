import mongoose from "mongoose";

import PostMessage from "../models/posts.model.js";


// @desc    GetPosts
// @route   GET /posts
// @access  private
export const getPosts = async(req, res) => {
    const { page } = req.query;

    try{
        const LIMIT = 6;
        // Get Starting Index of every page
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) });
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

// @desc    getPostsBySearch
// @route   GET /posts
// @access  private
export const getPostsBySearch = async (req, res) => { 
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");
        
        const posts = await PostMessage.find({ $or: [{ title: title }, {tags: {$in: tags.split(',')}}] })

        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// @desc    GetPost
// @route   GET /post
// @access  private
export const getPost = async(req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// @desc    CreatePosts
// @route   POST /posts
// @access  private
export const createPosts = async(req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    
    try {
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

// @desc    UpdatePosts
// @route   PATCH(UPDATE) /posts/:id
// @access  private
export const updatePosts = async(req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No post with that id');
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
}

// @desc    DeletePosts
// @route   DELETE /posts/:id
// @access  private
export const deletePosts = async(req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that id');
    }

    await PostMessage.findByIdAndDelete(id);

    res.json('Post Deleted Successfully');
}

// @desc    LikePosts
// @route   PATCH(UPDATE) /posts/:id/likePost
// @access  private
export const likePosts = async(req, res) => {
    const { id } = req.params;

    if(!req.userId){
        return res.json({ message: "Unauthenticated"})
    }
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No post with that ${id}`);
    }

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));
    if(index === -1){
        post.likes.push(req.userId);
    }
    else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

// @desc    commentPost
// @route   POST /posts/:id/commentPost
// @access  private
export const commentPost = async(req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    res.json(updatedPost);
}