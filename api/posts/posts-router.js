const express = require("express");
const posts = require("./posts-model");

// implement your posts router here
const router = express.Router();

// Root Route
router.get("/", (req, res) => {
    res.json({
        message: "You've Found the Root of the API"
    });
});

// Get All Posts
router.get("/api/posts", (req, res) => {
    posts.find(req.query)
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: "The posts information could not be retrieved"})
        })
})

// Get Specific Post
router.get("/api/posts/:id", (req, res) => {
    posts.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: "The post information could not be retrieved"})
        })
})

// find post and then return newly created id

// New Post
router.post("/api/posts", (req, res) => {
    const newPost = req.body;

    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            message: "Please provide title and contents for the post",
        })
    }

    posts.insert(newPost)
        .then((post) => {
            res.status(201).json({...post});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "There was an error while saving the post to the database",
            })
        })
})

// Update Specific Post
router.put("/api/posts/:id", (req, res) => {

    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({message: "Please provide title and contents for the post"})
    }

    const post = req.body;

    posts.update(req.params.id, post)
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: "The post information could not be retrieved"})
        })
})

// Delete Specific Post

router.delete("/api/posts/:id", (req, res) => {

    posts.remove(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: "The post could not be removed"})
        })
})

// Get Comments for Specific Post
router.get("/api/posts/:id/comments", (req, res) => {
    posts.findById(req.params.id)
        .then((post) => {
            if (!post) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                posts.findPostComments(req.params.id)
                .then((post) => {
                    if (post) {
                        res.status(200).json(post);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        message: "The comments information could not be retrieved"
                    })
                })
            }
        })
        .catch ((err) => {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        })
    })

module.exports = router;
