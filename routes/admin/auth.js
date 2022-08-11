import express from 'express';
import { check, validationResult } from 'express-validator';
import usersRepo from '../../repositories/users.js';
import signupTemplate from '../../views/admin/auth/signup.js';
import signinTemplate from '../../views/admin/auth/signin.js';
import validatorChain from './validators.js';

const router = express.Router(); // subrouter

router.get('/signup', (req, res) => {
    // 1. Send string to whoever makes a request to the root route
    // 2. Configure the form to make a POST request 
    // then pick up the request in a method below
    res.send(signupTemplate({ req }));
});

// pass in bodyParser method to parameters in router.post to parse our data

router.post(
    '/signup', 
    [   
        validatorChain.requireEmail,
        validatorChain.requirePassword,
        validatorChain.requirePasswordConfirmation
    ],
    async (req, res) => {
    // Results of any express-validator errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send(signupTemplate({ req, errors }));
    }

    // Access attributes of email, password, passwordConfirmation in form
    // Save these attributes as user data
    const { email, password, passwordConfirmation } = req.body;

    // Create a user in our user repo to represent this person
    const user = await usersRepo.create({ email, password });

    // Store the id of that user inside the user's cookie
    // so that cookie gets included in all of the followup requests
    req.session.userId = user.id; // added by cookie-session
    
    res.send('Account created!!!');
});

router.get('/signout', (req, res) => {
    // tell the browser to forget all the information stored inside the cookie
    req.session = null;
    res.send('You are logged out!');
});

router.get('/signin', (req, res) => {
    // show the sign in form to the user
    res.send(signinTemplate());
});

// If user did not sign up with email, then show error
// If username and pw do not match, then show error
// Otherwise, sign in
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await usersRepo.getOneBy({ email });

    if (!user) {
        return res.send('Email not found');
    }

    const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
    );

    if (!validPassword) {
        return res.send('Invalid password');
    }

    req.session.userId = user.id;

    res.send('You are signed in!!!');
});

export default router;