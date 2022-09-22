//INCLUSIONS
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errHandler = require('./routes/404');


const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://izidev:cz2WrSwSYAUSDXib@cluster0.on4qcra.mongodb.net/shop?retryWrites=true&w=majority';

//DEFINITIONS
const app = express();
//SESSION INITIAL SET UP
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
//SESSION
app.use(
    session({
        secret: 'secretvalue tre',
        resave: false, 
        saveUninitialized: false,
        store: store
        }) 
);

app.use((req, res, next) => {
    if (!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user=user;
        next();
    })
    .catch(err => console.log(err));
});

//ROUTE DEFFINITIONS
 app.use('/admin', adminRoutes);
 app.use(shopRoutes);
 app.use(authRoutes);
 app.use(errHandler);

mongoose
.connect(MONGODB_URI)
.then(result => {
    app.listen(3000);
})
.catch(err => console.log(err));