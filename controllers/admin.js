
const Product = require('../models/product');



exports.postAddProduct = (req, res, next) => {
    const title= req.body.title;
    const imageURL=req.body.imageURL;
    const price=req.body.price;
    const description=req.body.description;
   const product = new Product(title, price, description, imageURL, null, req.user._id);
   product
   .save()
    .then(result =>{
        console.log('Created Product');
        res.redirect('/admin/products');
    })
    .catch(err =>{
        console.log(err);
    });

}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const UpdatedTitle=req.body.title;
    const UpdatedImageURL=req.body.imageURL;
    const UpdatedPrice=req.body.price;
    const UpdatedDescription=req.body.description;

    product = new Product(UpdatedTitle, UpdatedPrice, UpdatedDescription, UpdatedImageURL, prodId)
    product.save()
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
Product.deleteById(ProdId)
    .then(() => {
        console.log('Deleted Product');
        res.redirect('/admin/products');
    })
    .catch(err =>console.log(err));
};


exports.getProductsAdmin = (req, res) => {
    Product.fetchAll()
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
    console.log(editMode);
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId= req.params.productID;
    Product.findById(prodId)
    .then(products => {
      //  const product=products[0];
        if (!products) {
            return res.redirect('/');
          } 
          res.render('admin/edit-product', {
          pageTitle: 'Edit Products Form', 
          path:'/admin/edit-product/',
          editing: editMode,
          product: products
        })
    })
    .catch(err =>console.log(err));
}