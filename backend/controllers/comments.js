const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const db = require('../models');
const {ObjectId} = require('mongodb');

const config = require('../../jwt.config.js');

const authMiddleware = (req, res, next) => {
    // Check if the 'Authorization' header is present and has the token
    const token = req.headers.authorization;
    if (token) {
        try {
            // Decode the token using the secret key and add the decoded payload to the request object
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next();
        } catch (err) {
            // Return an error if the token is invalid
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        // Return an error if the 'Authorization' header is missing or has the wrong format
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
};


// GET /api/comments/:id
router.get('/:id', (req, res) => {
    console.log('backend: get all comments for a game')
    console.log(req.params)
    db.Comment.find({gameId: req.params.id})
        .then(comments => {
            console.log(comments)
            res.json(comments);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        });
}
);


// POST /api/comments
router.post('/', authMiddleware, (req, res) => {
    console.log(req.body)
    const comment = {
        ...req.body,
        name: req.user.name,
        userId: req.user.id

    }
    db.Comment.create(comment)
        .then(newComment => {
            res.json(newComment);
        }
        )

})

// PUT /api/comments/:id
router.put('/:id', authMiddleware, async (req, res) => {
    console.log('backend: update a comment', req.user.id)
    const userComment = await db.Comment.findById(req.params.id)
    console.log(userComment.userId)
    if (userComment.userId == req.user.id) {
        const newComment = await db.Comment.findByIdAndUpdate(
            req.params.id,
            req.body,   
            { new: true }
        )
            res.json(newComment);
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
});


// DELETE /api/comments/:id
router.delete('/:id', authMiddleware, async (req, res) => {
    const userComment = await db.Comment.findById(req.params.id)
    if (userComment.userId == req.user.id){
        const deletedComment = await db.Comment.findByIdAndDelete(req.params.id)
        res.send('You deleted comment ' + deletedComment._id);
    }else {
            res.status(401).json({ message: 'Invalid user or token' });
        }
    }
);




module.exports = router;
