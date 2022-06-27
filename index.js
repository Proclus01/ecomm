//jshint esversion:11
import express from 'express';

const app = express();

//     // ************************ //       //
//     //                          //       //
//     //      Route Handlers      //       //
//     //                          //       //
//     // ************************ //       //

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
                <input name="passwordConfirmation" placeholder="password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

// **************** POST ****************** //

app.post('/', (req, res) => {
    // 1. Send string to whoever makes a request to the root route
    res.send('Account created!!!');
});

//

// **************************************** //

//

//     // ************************ //       //
//     //                          //       //
//     //        Listener          //       //
//     //                          //       //
//     // ************************ //       //

app.listen(3000, () => {
    // listen for messages at this port
    console.log('listening on port 3000');
});