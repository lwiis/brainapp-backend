////import Clarifai from 'clarifai';
const Clarifai = require('clarifai');
const clarifaiSettings = require('./clarifaiSettings.js');

const app = new Clarifai.App({
    apiKey: clarifaiSettings.appKey
  });

// this was on the client side:
// app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)

const handleApiCall = (req, res) => {
    const {input} = req.body;
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => {
        //console.log(data);
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
}

const handleImage = (db) => (req, res) => {
    const {id} = req.body;

    db('users')
    .where('id', id)
    .increment('entries', 1)
    .returning('*')
    .then(user => {
        res.json(user[0])
    });
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}