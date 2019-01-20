const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const app = express();

const db = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : '',
      password: '',
      database : 'brainapp'
    }
  });

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

app.use(bodyparser.json());
app.use(cors());

//dependency injection
app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfile(db));

app.put('/image', image.handleImage(db));

app.post('/imageurl', image.handleApiCall);

app.listen(3001, () => {
    console.log('app is running in port 3001');
});



/*
/ --> this is working

/signin POST --> res = success/fail
/register POST --> res = user
/profile/:userId GET --> res = user
/image --> PUT res = user

*/