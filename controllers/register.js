const handleRegister = (db, bcrypt) => (req, res) => {
    const {email, password, name } = req.body;

    if(!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    } else {

        const hash = bcrypt.hashSync(password);
        //database.users.push(user);
        
        //console.log('registering...');
        //console.log(req.body);
        
        db.transaction(trx => {
            trx.insert({
                email: email,
                hash: hash
            })
            .into('logins')
            .returning('email')
            .then(loginEmail => {
                //console.log('login created');
                return trx('users')
                .returning('*')
                .insert({
                    email: email,
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    //console.log('user created');
                    res.json(user[0]);
                });
            })
            .then(trx.commit)
            .catch(err => {
                trx.rollback;
                res.status(400).json('Error with registration');
            })
        });
    }
}

module.exports = {
    handleRegister: handleRegister
}