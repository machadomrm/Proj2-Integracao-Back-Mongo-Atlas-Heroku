const EstadoModel = require('../models/EstadoModel');
const Validate = require('../validations/Validate');

class EstadoController {

    static async adicionar(req,res){
        if(Validate.validarEstado(req.body)){
            try{
                const result = await EstadoModel.adicionar(req.body);
                return res.status(201).json(result);
            } catch(err){
                console.error(err.message);
                return res.status(400).json({message:"ERRO AO ADICIONAR"});
            }
        } else {
            return res.status(400).json({message:"INFORMAÇÃO DE CADASTRO INCORRETA"});
        }
    }

    static async listar(req,res){
        try{
            const result = await EstadoModel.listar();
            return res.status(200).json(result);
        } catch(err){
            console.error(err.message);
            return res.status(400).json({message:"ERRO AO LISTAR"});
        }
    }

    static async buscaPorNome(req,res){
        if(Validate.validarNome(req.params.nome)){
            try{
                const result = await EstadoModel.buscaPorNome(req.params.nome);
                return res.status(200).json(result);
            } catch(err){
                console.error(err.message);
                return res.status(400).json({message:"ERRO NA BUSCA"});
            }
        } else {
            return res.status(400).json({message:"PARÂMETRO NOME INCORRETO"});
        }
    }

    static async deletar(req,res){
        if(Validate.validarNome(req.params.nome)){
            try{
                const result = await EstadoModel.deletar(req.params.nome);
                return res.status(200).json(result);
            } catch(err){
                console.error(err.message);
                return res.status(400).json({message:"ERRO AO DELETAR"});
            }
        } else {
            return res.status(400).json({message:"PARÂMETRO NOME INCORRETO"});
        }  
    }

    static async alterar(req,res){
        if(Validate.validarNome(req.params.nome)||Validate.validarEstados(req.body)){
            try{
                const result = await EstadoModel.alterar(req.params.nome,req.body);
                return res.status(200).json(result)
            } catch(err){
                console.error(err.message);
                return res.status(400).json({message:"ERRO AO ALTERAR"});
            }
        } else {
            return res.status(400).json({message:"INFORMAÇÃO DE ACESSO INCORRETO"});
        }
    }        
}

module.exports = EstadoController;