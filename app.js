//INCLUSIONS
const express = require('express');
const path = require('path');
const sequelize = require('./util/database');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errHandler = require('./routes/404');
const bodyParser = require('body-parser');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
//DEFINITIONS
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

//GETTING DUMMY USER
app.use((req,res,next)=> { //getting dummy user  
    User.findByPk(1)
    .then(user => {
        req.user=user;
        next();
    })
    .catch(err => console.log(err));
});
//ROUTE DEFFINITIONS
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errHandler);

//ASSOCIATIONS
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

//TEMPORAL HANDLING FOR USERx
//sequelize.sync({force: true}) //override tables structure (good for the first time)
sequelize.sync()
.then(result => {
    //console.log(result);
    return User.findByPk(1);
})
.then(user =>{
    if (!user){
        return User.create({name:'Izrra', email:'test@test.com'});
    }
    return user;
})
.then (user => {
    return user.createCart();
})
.then (cart =>{
    app.listen(3000);
})
.catch(err => {console.log(err)});

