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
    (req, res) => {

        const errors = validationResult(req);

        console.log(req.file);

        res.send('submitted');
    }
);

export default router;