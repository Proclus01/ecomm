import express from 'express';
import CartsRepo from '../repositories/carts.js';
// also import carts template

const router = express.Router();

// Receive a post request to add an item to a cart

router.post(
    '/cart/products',
    async (req, res) => {
        // Figure out the cart!
        if (!req.session.cartId) {
            // If we don't have a cart, we need to create one
            // and store the cart id on the req.session.cartId property
            const cart = await CartsRepo.create({ items: [] });

            req.session.cartId = cart.id;

        } else {
            // We have a cart
            // So let's get it from the repository
        }

        res.send('Product added to cart');
    }
);

// Receive a GET request to show all items in cart

// router.get(
//     '/carts',
//     async (req, res) => {
//         const products = await CartsRepo.getAll();

//         // send a carts template
//     }
// );


// Receive a post request to delete an item from a cart

export default router;