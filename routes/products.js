import express from 'express';
import ProductsRepo from '../repositories/products.js';

const router = express.Router();

router.get(
    '/',
    async (req, res) => {
        const products = await ProductsRepo.getAll();

        res.send('Products!');
    }
);

export default router;