/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/api/users`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const jwt = require('jwt-simple')
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection and models
--------------------------------------------------------------- */
const db = require('../models')


/* Require the JWT config
--------------------------------------------------------------- */
const config = require('../../jwt.config.js')


/* Routes
--------------------------------------------------------------- */
// SIGN UP ROUTE (create user)
router.post('/signup', (req, res) => {
    // Create a new user
    db.User.create(req.body)
        .then(user => {
            // if the database creates a user successfully, assign a JWT to the user and send the JWT as the response
            const token = jwt.encode({ id: user.id }, config.jwtSecret)
            res.json({ token: token })
        })
        // send an error if the database fails to create a user
        .catch(() => {
            res.sendStatus(401)
                .json({ data: 'Could not create a new user, try again' })
        })
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
