//jshint esversion:11
import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import authRouter from './routes/admin/auth.js';
import adminProductsRouter from './routes/admin/products.js';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const app = express();

// Make 'public' file public and allow use of CSS file
app.use(express.static('public'));

// Automatically use body-parser in every route handler in this file
app.use(bodyParser.urlencoded({ extended: true })); 

// Add cookie-session and pass in config object
// The config object helps to encrypt the cookie so that users cannot modify cookies on their side
app.use(cookieSession({
    keys: ['WqJHeI13QEdSW9PPb'] // encryption key
}));

app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);

// **************** LISTENER *************** //

app.listen(3000, () => {
    // listen for messages at this port
    console.log('listening on port 3000');
});

