const express = require('express');
const { 
    getProducts, 
    getProduct, 
    updateProduct, 
    deleteProduct, 
    createProduct 
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


module.exports = router;