const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        console.log('Attempting to delete post with ID:', req.params.id);
        const post = await Post.findById(req.params.id);
        if (!post) {
            console.log('Post not found for ID:', req.params.id);
            return res.status(404).json({ message: 'Post not found' });
        }
        await post.deleteOne();
        console.log('Post deleted successfully:', req.params.id);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ message: err.message, stack: err.stack });
    }
});

module.exports = router;