const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

//Modelo em que os dados serão armazenados no banco de dados
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        localIndex: '2dsphere'
    }
});

module.exports = mongoose.model('Dev', DevSchema); //Exporta o modelo para o resto do programa