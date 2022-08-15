import express from 'express';
import { validationResult } from 'express-validator';
import multer from 'multer';
import ProductsRepo from '../../repositories/products.js';
import productsNewTemplate from '../../views/admin/products/new.js';
import validatorChain from './validators.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // store to memory and not file directory

router.get(
    '/admin/products', 
    (req, res) => {
    //
});

router.get(
    '/admin/products/new', 
    (req, res) => {
    
        res.send(productsNewTemplate({}));
});

router.post(
    '/admin/products/new',
    [
        validatorChain.requireTitle,
        validatorChain.requirePrice
    ],
    upload.single('image'),
    async (req, res) => {

        const errors = validationResult(req);

        // Store image as base64 to pass around the server, capture title and price
        const image = req.file.buffer.toString('base64');
        const { title, price } = req.body;
        await ProductsRepo.create( { title, price, image });

        res.send('submitted');
    }
);

export default router;