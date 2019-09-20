// requiring express
var express = require('express'); //1

const User = require('./models/models')
const router = require('express').Router();
const bcrypt = require('bcryptjs');



// my application
var app = express(); //2

//3         //4




// Database Connection
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('BlueBadgeProject', 'postgres', 'diego326', {
  host: 'localhost',
  dialect: 'postgres'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

// Testing the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to Bluebadge Project database.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });











// ROUTER



// VALIDATE SESSION 

const jwt = require('jsonwebtoken');


const validateSession = (req, res, next) => {
    const token= req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(!err && decoded) {
            User.findOne({
                where: {
                    id: decoded.id
                }
            }, console.log(decoded))
            .then(user => {
                if(!user) throw 'err'
                req.user = user
                return next();
                 })
                 .catch(err => next(err))

                } else {
                    req.errors = err 
                    return res.status(500).send('Not authorized')
                }
            })
        }

module.exports = validateSession;



// HEADERS
module.exports = (req, res, next) => {
    res.header('access-control-allow-origins', '*')
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    next();
};




// CREATING OUR ROUTES-------------------------------------

// GET request, with endpoint. It takes in the path(url) as the 1st argument and the req/res callback function as the second argument. 
app.get('/', (req, res) => {
    res.send('Hello world')
});



// ------------------------USER ROUTES-----------------------------

// GET request with SignUp endpoint; followed by the response for it to send. 
// app.get('/api/signup', (req, res) => {
//     //access the database objects with res.send:
//     res.send([1,2,3]);
// });




router.post('/signup', (req, res) => {
    User.create( {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)   //Hashing is the process of storing a password in hash form. 

    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: 60*60*24})
            res.json({
                user: user,
                message: 'Welcome to Porter! Your account has been created.',
                sessionToken: token
            })
      },
      createError = err => res.send(500, err)
    )
})



// GET request with SignIn endpoint; followed by the response for it to send. 
app.get('/api/signin', (req, res) => {
    // access the database objects here with res.send:
    res.send([1,2,3]);
    });

app.get('/api/findAll', (req, res) => {
    // access the database objects with res.send:
    res.send([1,2,3]);
});

// -------------------------CLOTHING ROUTES-------------------------------

app.post('/api/createClothing', (req, res) => {
    res.send([1,2,3]);
});

// 25:45

//--------------------------SHOPPING CART ROUTES--------------------------

app.post('/api/createOrder', (req, res) => {
    res.send([1,2,3]);
});

app.get('/api/reviewOrder', (req, res) => {
    res.send([1,2,3]);
});

app.put('/api/updateOrder', (req, res) => {
    res.send([1,2,3]);
});

app.delete('/api/deleteOrder', (req, res) => {
    ([1,2,3]);
});


// Port to listen on. This is identical to Node's http.Server.listen().
// The given path is localhost:3000. 
// When the connection happens, we use a callback function to console log a statement to tell us it's listening on 3000.
// app.listen(3000, function() {
//     console.log('Bluebadge App is listening on 3000!')
// });

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Bluebadge App is listening on ${port}!`));