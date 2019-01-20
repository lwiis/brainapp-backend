const handleProfile = (db) => (req, res) => {
    const {id} = req.params;
    //const users = database.users.filter(user => user.id === id);

    db('users').where('id', id)
        .then(users => {
            if(users.length > 0) {
                res.json(users[0]);
            } else {
                res.status(404).json('profile not found');
            }
        });
}

module.exports = {
    handleProfile: handleProfile
}