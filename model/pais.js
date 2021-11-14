const Paises = require('../database/paisesSchema');

class PaisesModel {

    static async adicionar(info){
        return await Paises.create(info)
    }

    static async listar(){
        return await Paises.find()
    }

    static async buscaPorNome(nome){
        const pais = await Paises.findOne({ nome: nome });
        if (pais === null) {
            return { message: "NOME NÃO ENCONTRADO" };
        } else {
            return {"OBJETO ENCONTRADO":pais};
        }
    }

    static async deletar(nome){
        const result = await Paises.findOneAndDelete({nome:nome});
        if(result===null){
            return {message:"NOME NÃO ENCONTRADO"}
        } else {
            return result
        }
    }

    static async alterar(nome, info){
        const result = await Paises.findOneAndUpdate({nome:nome},info);
        if(result===null){
            return {message:"NOME NÃO ENCONTRADO"}
        } else {
            return result
        }
    }
}

module.exports = PaisesModel;