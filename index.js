//jshint esversion:11
import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import authRouter from './routes/admin/auth.js';

// *******************************************
//                          
//          APP DESCR:
//          This server app creates an HTML form at root route
//          User data is captured by POST and saved.
//                          
// *******************************************

const app = express();

// Automatically use body-parser in every route handler in this file
app.use(bodyParser.urlencoded({ extended: true })); 

// Add cookie-session and pass in config object
// The config object helps to encrypt the cookie so that users cannot modify cookies on their side
app.use(cookieSession({
    keys: ['WqJHeI13QEdSW9PPb'] // encryption key
}));

app.use(authRouter);

// **************** LISTENER *************** //

app.listen(3000, () => {
    // listen for messages at this port
    console.log('listening on port 3000');
});

