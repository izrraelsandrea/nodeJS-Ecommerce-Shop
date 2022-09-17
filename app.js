//INCLUSIONS
const express = require('express');
const path = require('path');

 const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errHandler = require('./routes/404');

const bodyParser = require('body-parser');
const User = require('./models/user');
const mongoose = require('mongoose');

//DEFINITIONS
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

// //GETTING DUMMY USER
app.use((req,res,next)=> { //getting dummy user  
    User.findById('631c34bab31c4b72ddc261c4')
    .then(user => {
        req.user= user;
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
.connect('mongodb+srv://izidev:cz2WrSwSYAUSDXib@cluster0.on4qcra.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
    User.findOne().then(user =>{
        if (!user){
            const user = new User({
                name: 'Izrra',
                email: 'iziecomm@gmail.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    });   
    app.listen(3000);
})
.catch(err => console.log(err));