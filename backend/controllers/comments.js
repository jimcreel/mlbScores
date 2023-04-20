const express = require('express');
const router = express.Router();

const db = require('../models');

// GET /api/comments
router.get('/', (req, res) => {
    db.Comment.find()
        .then(comments => {
            console.log(comments);
            res.json(comments);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        });
}
);

// GET /api/comments/:id
router.get('/:id', (req, res) => {
    db.Comment.find({countryId: req.params.id})
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
        countryId: req.params.id
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
