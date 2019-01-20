const handleSignin = (db, bcrypt) => (req, res) => {
    const {email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json('incorrect form submission');
    } else {
        db.select('*').from('logins').where('email', email)
        .then(logins => {
            if(bcrypt.compareSync(password, logins[0].hash)) {
                db.select('*').from('users').where('email', email)
                .then(users => {
                    res.json(users[0]);
                })
                .catch(err => {
                    res.status(400).json('Error retrieving user');
                });
            }
            else {
                res.status(400).json('Invalid username or password');
            }
        })
        .catch(err => {
            res.status(400).json('Invalid username or password');
        })
    }
}

module.exports = {
    handleSignin: handleSignin
}