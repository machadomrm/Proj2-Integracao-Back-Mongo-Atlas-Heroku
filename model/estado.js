const { model } = require('mongoose');
const Estados = require('../database/estadosSchema');

class EstadosModel {

    static async adicionar(info){
        return await Estados.create(info)
    }

    static async listar(){
        return await Estados.find({})
    }

    static async buscaPorNome(nome){
        const result = await Estados.findOne({nome:nome})
        if(result===null){
            return {message:"NOME NÃO ENCONTRADO"}
        } else{
            return result
        }
    }
    
    static async deletar(nome){
        const result = await Estados.findOneAndDelete({nome:nome})
        if(result===null){
            return {message:"NOME NÃO ENCONTRADO"}
        } else{
            return result
        }
    }

    static async alterar(nome, info){
        const result = await Estados.findOneAndUpdate({nome:nome}, info)
        if(result===null){
            return {message:"NOME NÃO ENCONTRADO"}
        } else{
            return result
        }
    }
}

module.exports = EstadosModel;