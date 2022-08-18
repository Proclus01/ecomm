import express from 'express';
import CartsRepo from '../repositories/carts.js';
// also import carts template

const router = express.Router();

// Receive a post request to add an item to a cart

router.post(
    '/cart/products',
    async (req, res) => {
        // Figure out the cart!
        let cart;

        if (!req.session.cartId) {
            // If we don't have a cart, we need to create one
            // and store the cart id on the req.session.cartId property
            cart = await CartsRepo.create({ items: [] });

            req.session.cartId = cart.id;

        } else {
            // We have a cart
            // So let's get it from the repository
            cart = await CartsRepo.getOne(req.session.cartId);
        }

        const existingItem = cart.items.find(item => item.id === req.body.productId);

        
        if (existingItem) { 
            // Either increment quantity for existing product
            existingItem.quantity++;
        } else { 
            // OR add new product to items array
            cart.items.push({ id: req.body.productId, quantity: 1 });
        }

        // Send the updated cart to the repository
        await CartsRepo.update(cart.id, {
            items: cart.items
        });
        
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