import express from 'express';
import CartsRepo from '../repositories/carts.js';
// also import carts template

const router = express.Router();

// router.get(
//     '/carts',
//     async (req, res) => {
//         const products = await CartsRepo.getAll();

//         // send a carts template
//     }
// );

export default router;