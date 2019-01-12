const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

const database = {
    users: [
        {
            id: '1',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.use(bodyparser.json());
app.use(cors());

app.get('/', (req, res) => {
    //res.json('this is working');
    res.json(database.users);
});

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password)
        res.json(database.users[0]);
    else
        res.status(400).json('error logging in');
});

app.post('/register', (req, res) => {
    const {email, password, name } = req.body;
    const user = {
        id: '4',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    }
    database.users.push(user);
    res.json(user);
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    const users = database.users.filter(user => user.id === id);

    if(users.length > 0) {
        res.json(users[0]);
    } else {
        res.status(404).json('profile not found');
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++;
            return res.json(user);
        } 
    });

    if(!found) {
        res.status(404).json('profile not found');
    }
});

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