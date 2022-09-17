const Product = require('../models/product');
//const { findById } = require('../models/product');
const Order = require('../models/order');

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
    .populate('cart.items.productId')
    .then(user => {
        const products = user.cart.items.map(i => {
            return { quantity: i.quantity, product: { ...i.productId._doc } }; //.doc bring all the metadata from mongoose and info of the related collection products
        });
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products
        });
        return order.save();
    })
    .then(result => {
        return req.user.clearCart();
    })
    .then(() => {
        res.redirect('/orders');
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getProducts = (req, res) => {
    Product.find()
    .then(products => {
        console.log(products);
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
    .populate('cart.items.productId')
    .then(user => {
        const products = user.cart.items;
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
    req.user
    .removeFromCart(prodId)
    .then (result => {
        res.redirect('/cart');
    })
    .catch(err =>console.log(err));
};

exports.getOrders = (req, res, next) => { 
    Order.find({'user.userId': req.user._id })
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

