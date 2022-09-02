const Product = require('../models/product');
const { findById } = require('../models/product');

exports.addtoCart = (req, res, next) => {
    const prodId=req.body.productId;
    Product.findById(prodId)
    .then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        console.log(result);
        res.redirect('/cart')
    })
    .catch(err => console.log(err))
    };

exports.postOrder = (req, res, next) => {
  
    req.user
    .addOrder()
    .then(result => {
            res.redirect('/orders');
          })
          .catch(err => console.log(err));
};

exports.getProducts = (req, res) => {
    Product.fetchAll()
    .then(products => {
        res.render('shop/product-list', {
        prods: products, 
        pageTitle: 'Shop', 
        path: '/products-list/', 
        hasProducts: products.length > 0,
        activeShop:true
        });
    })
    .catch(err =>console.log(err));
}
exports.getProduct = (req, res, next) => {
    const prodId= req.params.productId;
    Product.findById(prodId)
    .then(product => { 
        res.render('shop/product-details', {
        product: product,
        pageTitle: 'Product details',
        path: '/products-list/',
        hasProducts: product.length > 0,
        activeShop: true,
        });
    })
    .catch(err =>console.log(err));

}
exports.getHomePage = (req, res, next) => {
    res.render('shop/index', {
    pageTitle: 'Home Page',
    path: '/',
    activeShop:true
    });
}
exports.getCart = (req, res, next) => {
    req.user
    .getCart()
    .then(products => {
            res.render('shop/cart', {
            pageTitle: 'Cart',
            path: '/cart/',
            activeShop:true, 
            products: products
            });  
        })
        .catch(err =>console.log(err));
}
exports.postDeleteCartProduct = (req, res, next) => {
    const prodId=req.body.productId;
    req.user.deleteCartItem(prodId)
    .then (result => {
        res.redirect('/cart');
    })
    .catch(err =>console.log(err));
};

exports.getOrders = (req, res, next) => { 
    req.user
    .getOrders()
    .then(orders => {
        console.log('Orders: ',orders);
        res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
        });
    })
    .catch(err => console.log(err));
 };

