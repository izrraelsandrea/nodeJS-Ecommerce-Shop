const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminController = require('../controllers/admin');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.get('/edit-product/:productID',adminController.getEditProduct);

router.post('/product-save', adminController.postAddProduct);

 router.get('/products' , adminController.getProductsAdmin);

 router.get('/add-product',adminController.getAddProduct);

 router.post('/edit-product', adminController.postEditProduct);

 router.post('/delete-product',adminController.postDeleteProduct);

module.exports = router;