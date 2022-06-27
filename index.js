//jshint esversion:11
import express from 'express';

const app = express();

//              // ************************ //
//              //                          //
//              //      Route Handler       //
//              //                          //
//              // ************************ //

app.get('/', (req, res) => {
    // send string to whoever makes a request to the root route
    // configure the form to make a POST request 
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

//              // ************************ //
//              //                          //
//              //        Listener          //
//              //                          //
//              // ************************ //

app.listen(3000, () => {
    // listen for messages at this port
    console.log('listening on port 3000');
});