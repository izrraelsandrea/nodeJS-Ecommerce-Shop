const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
    const title= req.body.title;
    const imageURL=req.body.imageURL;
    const price=req.body.price;
    const description=req.body.description;
    req.user //the user initilize on app.js will be assigned with the createProduct method
    .createProduct({
        title: title,
        price: price,
        imageUrl:imageURL,
        description: description
    })
    .then(result =>{
        console.log('Created Product');
        res.redirect('/admin/products');
    })
    .catch(err =>{
        console.log(err);
    });
    Product
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const UpdatedTitle=req.body.title;
    const UpdatedImageURL=req.body.imageURL;
    const UpdatedPrice=req.body.price;
    const UpdatedDescription=req.body.description;
    Product.findByPk(prodId)
    .then(product => {
    product.title=UpdatedTitle;
    product.imageUrl=UpdatedImageURL;
    product.price=UpdatedPrice;
    product.description=UpdatedDescription;
    return product.save();
    })
    .then(result => {
        console.log('Updated Product');
        res.redirect('/admin/products');
    })
    .catch(err =>console.log(err));    
}

exports.getAddProduct = (req,res,next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/edit-product', {
    pageTitle: 'Add Products Form', 
    path:'/admin/add-product/',
    activeAdp: true,
    editing: false
});
}
exports.postDeleteProduct = (req,res,next) => {
const ProdId=req.body.productId;
Product.findByPk(ProdId)
    .then(product =>{
        return product.destroy();
    })
    .then(result => {
        console.log('Destroyed Product');
        res.redirect('/admin/products');
    })
    .catch(err =>console.log(err));
};


exports.getProductsAdmin = (req, res) => {
    req.user
    .getProducts()
    .then(products => {
        res.render('admin/products', {
        prods: products, 
        pageTitle: 'Shop', 
        path: '/admin/products/', 
        hasProducts: products.length > 0,
        activeShop:true
        });
    })
    .catch(err =>console.log(err));     
}
exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId= req.params.productID;
    req.user
    .getProducts({where: { id: prodId } })
    //Product.findByPk(prodId)
    .then(products => {
        const product=products[0];
        if (!product) {
            return res.redirect('/');
          } 
          res.render('admin/edit-product', {
          pageTitle: 'Edit Products Form', 
          path:'/admin/edit-product/',
          editing: editMode,
          product: product
        })
    })
    .catch(err =>console.log(err));
}