import express from 'express';
import CartsRepo from '../repositories/carts.js';
import ProductsRepo from '../repositories/products.js';
import cartShowTemplate from '../views/carts/show.js';

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

router.get(
    '/cart',
    async (req, res) => {
        // make sure the user has a cart assigned to them
        if (!req.session.cartId) {
            return res.redirect('/');
        } else {
            // retrieve the cart from the cart repo
            const cart = await CartsRepo.getOne(req.session.cartId);
        }

        // display the list of carts

        // iterate through items array, look through each individual id, 
        for (let item of cart.items) {
            const product = await ProductsRepo.getOne(item.id);

            // and go through the products repo for each item
            item.product = product;
        }
        
        res.send(cartShowTemplate({ items: cart.items }));
    }
);


// Receive a post request to delete an item from a cart

export default router;