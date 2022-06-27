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
    res.send(`
        <div>
            <form>
                <input placeholder="email" />
                <input placeholder="password" />
                <input placeholder="password confirmation" />
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