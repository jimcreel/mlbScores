const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const db = require('../models');

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
    db.Comment.find({gameId: req.params.id})
        .then(comments => {
    
            res.json(comments);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        });
}
);


// POST /api/comments
router.post('/:id', (req, res) => {
    const comment = {
        ...req.body,
        gameId: req.params.gameId,
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
router.put('/:id', (req, res) => {
    db.Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(updatedComment => {
            res.json(updatedComment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        });
}
);


// DELETE /api/comments/:id
router.delete('/:id', (req, res) => {
    db.Comment.findByIdAndDelete(req.params.id)
        .then(deletedComment => {
            res.json(deletedComment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        });
}
);




module.exports = router;
