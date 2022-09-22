const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const shopController = require('../controllers/shop');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

  router.get('/cart', shopController.getCart);

  router.post('/cart', shopController.addtoCart);

  router.post('/delete-cart-product', shopController.postDeleteCartProduct);

  router.post('/create-order', shopController.postOrder);

 router.get('/products', shopController.getProducts);

 router.get('/product-details/:productId', shopController.getProduct);
    
 router.get('/orders', shopController.getOrders);

 router.get('/', shopController.getHomePage);
// //update
module.exports= router;