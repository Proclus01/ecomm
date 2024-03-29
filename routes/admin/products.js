import express from 'express';
import multer from 'multer';

import middleware from './middlewares.js';
import ProductsRepo from '../../repositories/products.js';
import productsNewTemplate from '../../views/admin/products/new.js';
import productsIndexTemplate from '../../views/admin/products/index.js';
import productsEditTemplate from '../../views/admin/products/edit.js';
import validatorChain from './validators.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // store to memory and not file directory

router.get(
    '/admin/products', 
    middleware.requireAuth,
    async (req, res) => {
    
        const products = await ProductsRepo.getAll();

        res.send(productsIndexTemplate({ products }));
});

router.get(
    '/admin/products/new',
    middleware.requireAuth, 
    (req, res) => {
    
        res.send(productsNewTemplate({}));
});

router.post(
    '/admin/products/new',
    middleware.requireAuth,
    upload.single('image'),
    [
        validatorChain.requireTitle,
        validatorChain.requirePrice
    ],
    middleware.handleErrors(productsNewTemplate),
    async (req, res) => {

        // Store image as base64 to pass around the server, capture title and price
        const image = req.file.buffer.toString('base64');
        const { title, price } = req.body;
        await ProductsRepo.create( { title, price, image });

        res.redirect('/admin/products');
    }
);

router.get(
    '/admin/products/:id/edit',
    middleware.requireAuth, 
    async (req, res) => {
        const product = await ProductsRepo.getOne(req.params.id);

        if (!product) {
            return res.send('Product not found');
        }

        res.send(productsEditTemplate({ product }));
});

router.post(
    '/admin/products/:id/edit',
    middleware.requireAuth,
    upload.single('image'),
    [
        validatorChain.requireTitle,
        validatorChain.requirePrice
    ],
    middleware.handleErrors(productsEditTemplate, async (req) => {

        // capture product data on error
        const product = await ProductsRepo.getOne(req.params.id);

        // and pass it back up to our HTML template in case of an error so it re-renders
        return { product };
    }),
    async (req, res) => {
        const changes = req.body;

        if (req.file) {
            changes.image = req.file.buffer.toString('base64');
        }

        try {
            await ProductsRepo.update(req.params.id, changes);
        } catch(err) {
            return res.send('Could not find item');
        }

        res.redirect('/admin/products');
    }
);

router.post(
    '/admin/products/:id/delete',
    middleware.requireAuth,
    async (req, res) => {
        await ProductsRepo.delete(req.params.id);

        res.redirect('/admin/products');
    }
);

export default router;