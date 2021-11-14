const mongoose = require('mongoose');

const cidadeSchema = new mongoose.Schema({
    nome:{type:String, required:true},
    quantidade_de_bairros:{type:Number, required:true},
    populacao:{type:String, required:true},
    aniversario_da_cidade:{type:Date, required:true}
});
     
module.exports = mongoose.model('Cidade', cidadeSchema);