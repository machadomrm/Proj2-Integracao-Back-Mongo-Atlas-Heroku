BLUE EdTech - MOD 3 - PROJETO 2
SOBRE O PROJETO
O projeto  consiste em criação para manipular 3 rotas: Países, Estados e Cidades. Cada uma contendo sub-rotas: '/add', '/update', '/delete',' /listall', '/listname'.
Tipo padrão MVC com: 
ROUTES - criação de rotas;
CONTROLLERS - para requisições e respostas;
MODELS - manipular dados que integram o banco de dados;
CONFIG - controla as configurações de base;
DATABASE - definições das Collections;
VALIDATIONS - validações das requisições;
Tecnologias utilizadas foram:
NODEJS
EXPRESS
MONGOOSE
CONSIGN
DOTENV
Iniciando o Projeto
O projeto inicia-se criando um arquivo server.js com o root;
Em seguida utilizamos o npm
npm init -y
Para facilitar no desenvolvimento do projeto, primeiramente instalamos o nodemon como uma dependência do desenvolvedor
npm i nodemon -D

No arquivo package.json definimos como "dev" e configuramos para rodar o nodemon
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
Na raiz foi estruturado da seguinte maneira:
   |- config
   |- controllers
   |- database
   |- model
   |- routes
   |- validations

No config foi criado dois arquivos: express_config.js e mongoose_config.js
No express_config.js definimos as configurações do Servidor. Para isso, foi utilizado o conceito de classes:
const express = require('express');
class App {
    constructor(){
        this.init = express();
        this.envVar();
        this.midd();
    }
    
    envVar(){
      this.init.set('port', process.env.PORT);
  }
    
    midd(){
        this.init.use(express.json());
    }
}
module.exports = new App().init
Importamos o App no server.js e utilizando o método listen(), subimos o Servidor
const app = require("./config/express_config");

app.listen(app.get('port'), ()=>{
    console.log(`SERVIDOR RODANDO NA PORTA ${app.get('port')}`)
})
Testamos o funcionamento do código com o comando
npm run dev
E se tudo rodar perfeitamente, teremos a seguinte saída
[nodemon] 2.0.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json  
[nodemon] starting `node server.js`

SERVIDOR RODANDO NA PORTA 3000
Integração com o Banco de Dados
Primeiramente instalamos o mongoose, que é o módulo responsável por conectar o programa ao banco de dados
npm i mongoose
No arquivo mongooseConfig.js realizamos as configurações para o mongoose conectar ao Mongo Atlas
const mongoose = require('mongoose');

const connectionString = ``
//CONEXÃO COM O BD
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log("CONECTADO AO MONGODB")})
.catch((err)=>{console.error({"FALHA AO CONECTAR COM O MONGODB":err.message})})

//EVENTOS
mongoose.connection.on("connected", ()=>{console.log("CONECTADO AO MONGOOSE")});
mongoose.connection.on("disconnected", ()=>{console.log("DESCONECTADO DO MONGOOSE")});
mongoose.connection.on("error", (err)=>{console.error({"FALHA NA CONEXÃO COM O MONGOOSE":err.message})});
process.on('SIGINT', ()=>{
    mongoose.connection.close(()=>{
        console.log("APLICAÇÃO ENCERRADA PELO USUÁRIO");
        process.exit(0);
    });
});

module.exports = mongoose
Antes de definir o connectionString, primeiro vamos proteger os dados que são sensíveis com o dotenv
npm i dotenv
Para que o dotenv funcione, definimos no root o arquivo .env(contendo as informações sensíveis) e importamos o config() do dotenv no arquivo mongooseConfig.js para configuramos o connectionString
.env
DB_USER = [nome do usuário do banco de dados]
DB_PWD = [senha]
DB_DATABASE = [nome do banco de dados]
DB_HOST = [link gerado pelo próprio banco de dados para acessá-lo remotamente]
PORT = 3000 [definimos a porta do servidor aqui para uso futuro]
const mongoose = require('mongoose');
const {config} = require('dotenv')

//dotenv
config()
const db_user = process.env.DB_USER
const db_pwd = process.env.DB_PWD
const db_database = process.env.DB_DATABASE
const db_host = process.env.DB_HOST

const connectionString = `mongodb+srv://${db_user}:${db_pwd}@${db_host}/${db_database}`;

//CONEXÃO COM O BD
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log("CONECTADO AO MONGODB")})
.catch((err)=>{console.error({"FALHA AO CONECTAR COM O MONGODB":err.message})})

//EVENTOS
mongoose.connection.on("connected", ()=>{console.log("CONECTADO AO MONGOOSE")});
mongoose.connection.on("disconnected", ()=>{console.log("DESCONECTADO DO MONGOOSE")});
mongoose.connection.on("error", (err)=>{console.error({"FALHA NA CONEXÃO COM O MONGOOSE":err.message})});
process.on('SIGINT', ()=>{
    mongoose.connection.close(()=>{
        console.log("APLICAÇÃO ENCERRADA PELO USUÁRIO");
        process.exit(0);
    });
});

module.exports = mongoose
PREPARAÇÃO PARA O CRUD
Agora que temos a conexão com o banco de dados, vamos começar a manipulá-lo. Para isso, criamos dentro do routes 4 arquivos: paisesRoutes.js, estadosRoutes.js, cidadesRoutes.js e index.js
Em paisesRoutes.js, estadosRoutes.js, cidadesRoutes.js, a estrutura será a mesma.
Começamos por importar Router() e definir as sub-rotas GET, POST, PUT, DELETE
const {Router} = require('express');
const router = Router();

router.post("/add", )
router.get("/listall", )
router.get("/listname/:nome", )
router.delete("/delete/:nome", )
router.put("/update/:nome", )

module.exports = router
No index.js criamos uma função que recebe como parâmetro app e define para cada rota uma ROTA BASE. Aqui, importamos todos os 3 arquivos de routes
const paisesRoutes = require('./paisesRoutes');
const estadosRoutes = require('./estadosRoutes');
const cidadesRoutes = require('./cidadesRoutes');

module.exports = (app) => {
    app
    .use("/paises", paisesRoutes)
    .use("/estados", estadosRoutes)
    .use("/cidades", cidadesRoutes)
}
Voltando para o ExpressConfig.js, definimos o método routes(). Para tanto, será necessário instalar o módulo consign
npm i consign

Ao chamar consign() dentro do método routes(), definimos como diretório base (cwd). E configuramos para que this.init seja passado como parâmetro para o index.js.
Agora todas as rotas são enviadas para o index.js e deste, para o this.routes()
const express = require('express');
const db = require("./mongooseConfig")
const consign = require('consign');

class App {

    constructor(){
        this.init = express();
        this.db = db;
        this.envVar();
        this.midd();
        this.routes();//rotas adicionado
    }

    envVar(){
        this.init.set('port', process.env.PORT);
    }

    midd(){
        this.init.use(express.json());
    }

    routes(){
        consign({cwd:'api'}) //api definido como current working directory
            .include('routes/index.js') //path onde será enviado o this.init
            .into(this.init)
    }
}

module.exports = new App().init
Rodando o código, temos a seguinte saída
[nodemon] 2.0.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json  
[nodemon] starting `node server.js`
consign v0.1.6 Initialized in api
+ .\routes\index.js
SERVIDOR RODANDO NA PORTA 3000
CONECTADO AO MONGOOSE
CONECTADO AO MONGODB

INICIANDO O CRUD
As rotas seguem as mesmas estruturas, será demostrada o CRUD. No controllers, criamos o arquivo: Paises/Estados/CidadesController.js
No models também criamos o arquivo: Paises/Estados/CidadesModel.js
Iniciamos o CRUD importando o Controller no Routes e definindo os métodos ligados a cada sub-rota
const CidadeController = require("../controllers/CidadesController");
const { Router } = require("express");
const router = Router();

router.post("/add", CidadeController.adicionar);
router.get("/listall", CidadeController.listar);
router.get("/listname/:nome", CidadeController.buscaPorNome);
router.delete("/delete/:nome", CidadeController.deletar);
router.put("/update/:nome", CidadeController.alterar);

module.exports = router;

Os controllers serão as classes contendo métodos que receberão as requisições e decidirão quais manipulações que deverão ser realizadas no banco de dados pelos models.
Para a segurança das informações externas (requisições), devem ser validadas antes prosseguir para o models, assim  foi criado o diretório validation que conterá a classe validate contendo os métodos de validação das informações.
class Validate {

    static validarNome(nome){
        if(/\d/.test(nome)||/\W/.test(nome)){
            return false
        }
        return true
    }

    static validarPaises(info){
        if(!info||!info.nome||!info.populacao||!info.linguaMae||!info.pib){
            return false
        }
        return true
    }

    static validarEstados(info){
        if(!info||!info.nome||!info.regiao||!info.populacao||!info.salarioMinimo){
            return false
        }
        return true
    }

    static validarCidades(){
        if(!info||!info.nome||!info.quantidadeDeBairros||!info.populacao||!info.aniversarioDaCidade){
            return false
        }
        return true
    }
}

module.exports = Validate;
Com todo o ambiente finalizado, iremos dar andamento a	o CRUD
POST
Controller
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
        ).format("YYYY-MM-DD");
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



module.exports = CidadeController;  Model
const Paises = require('../database/paisesSchema');

class PaisesModel {

    static async adicionar(info){
        return await Paises.create(info)
    }
}
module.exports = PaisesModel;
Retorno
Status: 201 Created
Size: 111 Bytes
Time: 148 ms

GET
Controller
const PaisesModel = require('../models/PaisesModel');
const Validate = require('../validations/Validate');

class PaisesController {
    static async listar(req,res){
        try{
            const result = await PaisesModel.listar();
            return res.status(200).json(result);
        } catch(err){
            console.error(err.message);
            res.status(400).json({message:"ERRO AO OBTER A LISTA"});
        }
    }
}
module.exports = PaisesController
Model
const Cidades = require("../database/cidadesSchemas");

class CidadeModel {
   

static async listar() {
    return await Cidades.find({});
    }
} 
	 
module.exports = CidadeModel;Retorno
Status: 200 OK
Size: 215 Bytes
Time: 57 ms






GET
Controller
const EstadoModel = require("../model/estado");
const Validate = require("../validation/validate");

class EstadoController {
static async buscaPorNome(req, res) {
    if (Validate.validarNome(req.params.nome)) {
      try {
        const result = await EstadoModel.buscaPorNome(req.params.nome);
        return res.status(200).json(result);
      } catch (err) {
        console.error(err.message);
        return res.status(400).json({ message: "ERRO NA BUSCA" });
      }
    } else {
      return res.status(400).json({ message: "PARÂMETRO NOME INCORRETO" });
    }
  }
} 
module.exports = PaisesControllerModel
const Paises = require('../database/paisesSchema');

class PaisesModel {
	static async buscaPorNome(nome){
        const pais = await Paises.findOne({ nome: nome });
        if (pais === null) {
            return { message: "NOME NÃO ENCONTRADO" };
        } else {
            return {"OBJETO ENCONTRADO":pais};
        }
    }
}
module.exports = PaisesModel;
Retorno
Status: 200 OK
Size: 121 Bytes
Time: 37 ms

PUT
Controller
const EstadoModel = require("../model/estado");
const Validate = require("../validation/validate");

class EstadoController {
static async alterar(req, res) {
    if (
      Validate.validarNome(req.params.nome) || Validate.validarEstados(req.body)) {
      try {
        const result = await EstadoModel.alterar(req.params.nome, req.body);
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

module.exports = EstadoController;

Model
const Cidades = require("../database/cidadeSchemas");

class CidadeModel {
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
Retorno
Status: 200 OK
Size: 121 Bytes
Time: 61 ms

DELETE
Controller
const EstadoModel = require("../model/estado");
const Validate = require("../validation/validate");

class EstadoController {
static async deletar(req, res) {
    if (Validate.validarNome(req.params.nome)) {
      try {
        const result = await EstadoModel.deletar(req.params.nome);
        return res.status(200).json(result);
      } catch (err) {
        console.error(err.message);
        return res.status(400).json({ message: "ERRO AO DELETAR" });
      }
    } else {
      return res.status(400).json({ message: "PARÂMETRO NOME INCORRETO" });
    }
  }
module.exports = EstadoController;

Model
const Paises = require('../database/paisesSchema');

class PaisesModel {
    static async deletar(nome){
        const result = await Paises.findOneAndDelete({nome:nome});
        if(result===null){
            return {message:"NOME NÃO ENCONTRADO"}
        } else {
            return result
        }
    }
}
module.exports = PaisesModel;
Retorno
Status: 200 OK
Size: 118 Bytes
Time: 643 ms