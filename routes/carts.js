import express from 'express';
import CartsRepo from '../repositories/carts.js';
// also import carts template

const router = express.Router();

// Receive a post request to add an item to a cart

router.post(
    '/cart/products',
    (req, res) => {
        console.log(req.body.productId);

        res.send('Product added to cart');
    }
);

// Receive a GET request to show all items in cart

// Receive a post request to delete an item from a cart

// router.get(
//     '/carts',
//     async (req, res) => {
//         const products = await CartsRepo.getAll();

//         // send a carts template
//     }
// );

export default router;