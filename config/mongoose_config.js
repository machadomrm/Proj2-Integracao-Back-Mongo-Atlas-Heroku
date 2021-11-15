const mongoose = require("mongoose");
const { config } = require("dotenv");

//dotenv
config();

const db_user = process.env.DB_USER; 

const db_pwd = process.env.DB_PWD; 

const db_database = process.env.DB_DATABASE;

const db_host = process.env.DB_HOST;   

const connectionString = `mongodb+srv://${db_user}:${db_pwd}@${db_host}/${db_database}`;

//conexão com o banco de dados
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONECTADO AO MONGODB");
  })
  .catch((err) => {
    console.error({ "FALHA AO CONECTAR COM O MONGODB": err.message });
  });

//eventos
mongoose.connection.on("connected", () => {
  console.log("CONECTADO AO MONGOOSE");
});
mongoose.connection.on("disconnected", () => {
  console.log("DESCONECTADO DO MONGOOSE");
});
mongoose.connection.on("error", (err) => {
  console.error({ "FALHA NA CONEXÃO COM O MONGOOSE": err.message });
});
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("APLICAÇÃO ENCERRADA PELO USUÁRIO");
    process.exit(0);
  });
});

module.exports = mongoose;
