//jshint esversion:11
import express from 'express';

// *******************************************
//                          
//          APP DESCR:
//          This server app creates an HTML form at root route
//          User data is captured by POST and saved 
//                          
// *******************************************

const app = express();

// **************************************** //

//

//     // ************************ //       //
//     //                          //       //
//     //        Functions         //       //
//     //                          //       //
//     // ************************ //       //

// Simple body-parser clone for testing
const bodyParser = (req, res, next) => {

    // wrap our req.on with validation to check if we have a POST method
    if (req.method === 'POST') {

        req.on('data', (data) => {

            // Convert data from buffer form to utf-8 and store in array
            const parsed = data.toString('utf8').split('&');
            const formData = {}; // This will store our key-value pairs
    
            // Iterate over array and read key-value pairs from string
            for (let pair of parsed) {
                const [key, value] = pair.split('=');
    
                // Add the key-value pair to our object
                formData[key] = value;
            }
    
            // add form data to body to capture in app.post
            req.body = formData;

            // tell express to continue
            next();

        }); // end req.on
    }
    else {
        // tell express to continue
        next();
    }
}; // end bodyParser

//

// **************************************** //

// 

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

app.post('/', bodyParser, (req, res) => {
    // Access attributes of email, password, passwordConfirmation in form
    // Save these attributes as user data
    console.log(req.body);
    
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