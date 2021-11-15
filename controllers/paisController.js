const PaisModel = require("../model/pais");
const Validate = require("../validation/validate");

class PaisController {
  static async adicionar(req, res) {
    if (Validate.validarPais(req.body)) {
      try {
        const result = await PaisModel.adicionar(req.body);
        return res.status(201).json(result);
      } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: "ERRO AO ADICIONAR" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "INFORMAÇÃO DE CADASTRO INCORRETA" });
    }
  }

  static async listar(req, res) {
    try {
      const result = await PaisModel.listar();
      return res.status(200).json(result);
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ message: "ERRO AO OBTER A LISTA" });
    }
  }

  static async buscaPorNome(req, res) {
    if (Validate.validarNome(req.params.nome)) {
      try {
        const result = await PaisModel.buscaPorNome(req.params.nome);
        return res.status(200).json(result);
      } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: "ERRO NA BUSCA" });
      }
    } else {
      return res.status(400).json({ message: "PARÂMETRO NOME INCORRETO" });
    }
  }

  static async deletar(req, res) {
    if (Validate.validarNome(req.params.nome)) {
      try {
        const result = await PaisModel.deletar(req.params.nome);
        return res.status(200).json(result);
      } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: "ERRO AO DELETAR" });
      }
    } else {
      return res.status(400).json({ message: "PARÂMETRO NOME INCORRETO" });
    }
  }

  static async alterar(req, res) {
    if (
      Validate.validarNome(req.params.nome) ||
      Validate.validarPais(req.body)
    ) {
      try {
        const result = await PaisModel.alterar(req.params.nome, req.body);
        return res.status(200).json(result);
      } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: "ERRO AO ALTERAR" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "INFORMAÇÃO DE ACESSO INCORRETO" });
    }
  }
}

module.exports = PaisController;
