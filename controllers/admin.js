const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
    const title= req.body.title;
    const imageURL=req.body.imageURL;
    const price=req.body.price;
    const description=req.body.description;
    const product = new Product(null,title, imageURL, price, description);
    product.save();
    res.redirect('/');
}
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const UpdatedTitle=req.body.title;
    const UpdatedImageURL=req.body.imageURL;
    const UpdatedPrice=req.body.price;
    const UpdatedDescription=req.body.description;
    const UpdatedProduct = new Product(prodId, UpdatedTitle, UpdatedImageURL, UpdatedPrice, UpdatedDescription);
    UpdatedProduct.save();
    res.redirect('/admin/products');
    
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
Product.deleteById(ProdId);
res.redirect('/admin/products');
};


exports.getProductsAdmin = (req, res) => {
    Product.fetchAll(products =>{
        res.render('admin/products', {
        prods: products, 
        pageTitle: 'Admin Product List', 
        path: '/admin/products/', 
        hasProducts: products.length > 0,
        activeShop:true
        });
    });
}
exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId= req.params.productID;
    Product.findById(prodId, product => {
        if (!product) {
          return res.redirect('/');
        } 
        res.render('admin/edit-product', {
        pageTitle: 'Edit Products Form', 
        path:'/admin/edit-product/',
        editing: editMode,
        product: product
    });
    
});
}