class Validate {
  static validarNome(nome) {
    if (/\d/.test(nome) || /\W/.test(nome)) {
      return false;
    }
    return true;
  }

  static validarPais(info) {
    if (
      !info ||
      !info.nome ||
      !info.populacao ||
      !info.lingua_mae ||
      !info.pib
    ) {
      return false;
    }
    return true;
  }

  static validarEstado(info) {
    if (
      !info ||
      !info.nome ||
      !info.regiao ||
      !info.populacao ||
      !info.salario_minimo
    ) {
      return false;
    }
    return true;
  }

  static validarCidade(info) {
    if (
      !info ||
      !info.nome ||
      !/\d/.test(info.quantidade_de_bairros) ||
      !info.populacao ||
      !info.aniversario_da_cidade
    ) {
      return false;
    }
    return true;
  }
}

module.exports = Validate;
