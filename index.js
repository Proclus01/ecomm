//jshint esversion:11
import express from 'express';
import bodyParser from 'body-parser';

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

// **************** GET ******************* //

app.get('/', (req, res) => {
    // 1. Send string to whoever makes a request to the root route
    // 2. Configure the form to make a POST request 
    // then pick up the request in a method below
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input 
                    name="passwordConfirmation" 
                    placeholder="password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

// **************** POST ****************** //

// pass in bodyParser method to parameters in app.post to parse our data

app.post('/', (req, res) => {
    // Access attributes of email, password, passwordConfirmation in form
    // Save these attributes as user data
    console.log(req.body);
    
    res.send('Account created!!!');
});

// **************** LISTENER *************** //

app.listen(3000, () => {
    // listen for messages at this port
    console.log('listening on port 3000');
});

