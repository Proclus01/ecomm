import express from 'express';
import middleware from './middlewares.js';
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
    middleware.handleErrors(signupTemplate),
    async (req, res) => {

    // Access attributes of email, password, passwordConfirmation in form
    // Save these attributes as user data
    const { email, password } = req.body;

    // Create a user in our user repo to represent this person
    const user = await usersRepo.create({ email, password });

    // Store the id of that user inside the user's cookie
    // so that cookie gets included in all of the followup requests
    req.session.userId = user.id; // added by cookie-session
    
    res.redirect('admin/products');
});

router.get('/signout', (req, res) => {
    // tell the browser to forget all the information stored inside the cookie
    req.session = null;
    res.send('You are logged out!');
});

router.get('/signin', (req, res) => {
    // show the sign in form to the user
    res.send(signinTemplate({})); // pass in empty object to avoid breaking destructuring in signin.js
});

// If user did not sign up with email, then show error
// If username and pw do not match, then show error
// Otherwise, sign in
router.post(
    '/signin', 
    [
        validatorChain.requireEmailExists,
        validatorChain.requireValidPasswordForUser
    ],
    middleware.handleErrors(signinTemplate),
    async (req, res) => {

    const { email, password } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;

    res.redirect('admin/products');
});

export default router;