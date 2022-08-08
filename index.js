//jshint esversion:11
import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import usersRepo from './repositories/users.js';

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

app.get('/signup', (req, res) => {
    // 1. Send string to whoever makes a request to the root route
    // 2. Configure the form to make a POST request 
    // then pick up the request in a method below
    res.send(`
        <div>
            Your id is: ${req.session.userId}
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

// pass in bodyParser method to parameters in app.post to parse our data

app.post('/signup', async (req, res) => {
    // Access attributes of email, password, passwordConfirmation in form
    // Save these attributes as user data
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({ email });

    if (existingUser) {
        return res.send('Email in use');
    }

    if (password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }

    // Create a user in our user repo to represent this person
    const user = await usersRepo.create({ email, password });

    // Store the id of that user inside the user's cookie
    // so that cookie gets included in all of the followup requests
    req.session.userId = user.id; // added by cookie-session
    
    res.send('Account created!!!');
});

app.get('/signout', (req, res) => {
    // tell the browser to forget all the information stored inside the cookie
    req.session = null;
    res.send('You are logged out!');
});

app.get('/signin', (req, res) => {
    // show the sign in form to the user
    res.send(`
    <div>
    <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <button>Sign In</button>
    </form>
    </div>
    `);
});

app.post('/signin', async (req, res) => {
    // 
});

// **************** LISTENER *************** //

app.listen(3000, () => {
    // listen for messages at this port
    console.log('listening on port 3000');
});

