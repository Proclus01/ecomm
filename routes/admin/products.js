import express from 'express';
import { validationResult } from 'express-validator';
import ProductsRepo from '../../repositories/products.js';
import productsNewTemplate from '../../views/admin/products/new.js';
import validatorChain from './validators.js';

const router = express.Router();

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
    (req, res) => {

        const errors = validationResult(req);

        req.on('data', data => {
            console.log(data.toString());
        });

        res.send('submitted');
    }
);

export default router;