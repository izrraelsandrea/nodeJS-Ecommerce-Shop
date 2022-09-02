//INCLUSIONS
const express = require('express');
const path = require('path');
 const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errHandler = require('./routes/404');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

//DEFINITIONS
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

//GETTING DUMMY USER
app.use((req,res,next)=> { //getting dummy user  
    User.findById('630b01c481f4c118c5319dcb')
    .then(user => {
        req.user= new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err => console.log(err));
});
//ROUTE DEFFINITIONS
 app.use('/admin', adminRoutes);
 app.use(shopRoutes);
 app.use(errHandler);

mongoConnect(() => {
    app.listen(3000);
});
