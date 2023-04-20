/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const cors = require('cors');


/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');


/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const commentsCtrl = require('./controllers/comments')



/* Create the Express app
--------------------------------------------------------------- */
const app = express();


/* Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */



/* Configure the app (app.set)
--------------------------------------------------------------- */



/* Middleware (app.use)
--------------------------------------------------------------- */

// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them 
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


/* Mount routes
--------------------------------------------------------------- */


// When a GET request is sent to `/seed`, the pets collection is seeded



// This tells our app to look at the `controllers/comments.js` file 
// to handle all routes that begin with `localhost:3000/api/comments`
app.use('/api/comments', commentsCtrl)




// The "catch-all" route: Runs for any other URL that doesn't match the above routes
app.get('*', function (req, res) {
    res.send('404')
});


/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});