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

// If user did not sign up with email, then show error
// If username and pw do not match, then show error
// Otherwise, sign in
app.post('/signin', async (req, res) => {
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