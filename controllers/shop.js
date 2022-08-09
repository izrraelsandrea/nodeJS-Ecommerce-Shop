const Product = require('../models/product');
const Cart = require('../models/cart');
const { findById } = require('../models/product');

exports.addtoCart = (req, res, next) => {
    const prodId=req.body.productId;
    Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
    });
    console.log(req.body);
    res.redirect('/cart');
    }

exports.getProducts = (req, res) => {
    Product.fetchAll()
    .then(([rows, fieldData]) =>{
        res.render('shop/product-list', {
        prods: rows, 
        pageTitle: 'Shop', 
        path: '/products-list/', 
        hasProducts: rows.length > 0,
        activeShop:true
        });
    })
    .catch(err =>console.log(err));
}
exports.getProduct = (req, res, next) => {
    const prodId= req.params.productId;
    Product.findById(prodId)
    .then(([product]) => { 
        res.render('shop/product-details', {
        product: product[0],
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
    Cart.getCart(cart => { 
        Product.fetchAll(products => { 
        const cartProducts=[];
            for (product of products){
                const cartProductData = cart.products.find(prod => prod.id===product.id);
                if (cartProductData){
                    cartProducts.push({ProductData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {
            pageTitle: 'Cart',
            path: '/cart/',
            activeShop:true, 
            products: cartProducts
            });
        });    
    });
}
exports.postDeleteCartProduct = (req, res, next) => {
    const prodId=req.body.productId;
    Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
    }); 
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
    pageTitle: 'My Orders',
    path: '/orders/',
    activeShop:true
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout' , 
        path: '/checkout' ,
        activeShop: true
    });
}

