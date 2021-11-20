const CidadeModel = require("../model/cidade");
const Validate = require("../validation/validate");
const moment = require("moment");

class CidadeController {
  static async adicionar(req, res) {
    if (Validate.validarCidade(req.body)) {
      try {
        req.body.aniversarioDaCidade = moment(
          req.body.aniversarioDaCidade,
          "DD/MM/YYYY"
        );
        let now = moment().format("YYYY-MM-DD");
        await CidadeModel.adicionar(req.body);
        return res.status(201).json({ message: "ADICIONADO" });
      } catch (err) {
        console.error(err.message);
        return res.status(400).json({ message: "ERRO AO ADICIONAR" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "INFORMAÇÃO DE CADASTRO INCORRETA" });
    }
  }

  static async listar(req, res) {
    try {
      const result = await CidadeModel.listar();
      return res.status(200).json(result);
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({ message: "ERRO AO LISTAR" });
    }
  }

  static async buscaPorNome(req, res) {
    if (Validate.validarNome(req.params.nome)) {
      try {
        const result = await CidadeModel.buscaPorNome(req.params.nome);
        return res.status(200).json(result);
      } catch (err) {
        console.error(err.message);
        return res.status(400).json({ message: "ERRO NA BUSCA" });
      }
    } else {
      return res.status(400).json({ message: "PARÂMETRO NOME INCORRETO" });
    }
  }

  static async deletar(req, res) {
    if (Validate.validarNome(req.params.nome)) {
      try {
        const result = await CidadeModel.deletar(req.params.nome);
        return res.status(200).json(result);
      } catch (err) {
        console.error(err.message);
        return res.status(400).json({ message: "ERRO AO DELETAR" });
      }
    } else {
      return res.status(400).json({ message: "PARÂMETRO NOME INCORRETO" });
    }
  }

  static async alterar(req, res) {
    if (
      Validate.validarNome(req.params.nome) ||
      Validate.validarCidades(req.body)
    ) {
      try {
        const result = await CidadesModel.alterar(req.params.nome, req.body);
        return res.status(200).json(result);
      } catch (err) {
        console.error(err.message);
        return res.status(400).json({ message: "ERRO AO ALTERAR" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "INFORMAÇÃO DE ACESSO INCORRETO" });
    }
  }
}

module.exports = CidadeController;
