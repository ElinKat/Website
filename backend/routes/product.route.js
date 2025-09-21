import express from 'express';
import { updateProduct, deleteProduct, getProducts, createProduct } from '../controllers/product.controller.js';

const router = express.Router();

// if (!mongoose.Types.ObjectId.isValid(id)) {
    // return res.status(404).json({ success: false, message: 'Invalid product ID' });
// }

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
