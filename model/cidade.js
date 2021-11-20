const Cidades = require("../database/cidadesSchema");

class CidadeModel {
  static async adicionar(info) {
    return await Cidades.create(info);
  }

  static async listar() {
    return await Cidades.find({});
  }

  static async buscaPorNome(nome) {
    const result = await Cidades.findOne({ nome: nome });
    if (result === null) {
      return { message: "NOME NÃO ENCONTRADO" };
    } else {
      return result;
    }
  }

  static async deletar(nome) {
    const result = await Cidades.findOneAndDelete({ nome: nome });
    if (result === null) {
      return { message: "NOME NÃO ENCONTRADO" };
    } else {
      return result;
    }
  }

  static async alterar(nome, info) {
    const result = await Cidades.findOneAndUpdate({ nome: nome }, info);
    if (result === null) {
      return { message: "NOME NÃO ENCONTRADO" };
    } else {
      return result;
    }
  }
}

module.exports = CidadeModel;
