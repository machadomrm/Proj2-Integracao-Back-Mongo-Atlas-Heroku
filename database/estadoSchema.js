const mongoose = require('mongoose');

const estadoSchema = new mongoose.Schema({
    nome:{type:String, required:true},
    regiao:{type:String, required:true},
    populacao:{type:Number, required:true},
    salario_minimo:{type:Number, required:true}
});

module.exports = mongoose.model('Estado', estadoSchema);