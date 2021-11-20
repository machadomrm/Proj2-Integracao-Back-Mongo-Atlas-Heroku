const mongoose = require('mongoose');

const paisSchema = new mongoose.Schema({
    nome:{type:String, required:true},
    populacao:{type:String, required:true},
    lingua_mae:{type:String, required:true},
    pib:{type:String, required:true}
});

module.exports = mongoose.model('Pais', paisSchema);