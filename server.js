const app = require("./config/express_config");


app.listen(app.get("port"), () => {
  console.log('SERVIDOR RODANDO NA PORTA ${app.get("port || 3000")}');
});

// const​ ​app​ ​=​ ​express​(​)​; 
//  ​const​ ​port​ ​=​ ​process​.​env​.​PORT​ ​||​ ​3000​;

 
//  ​app​.​listen​(​port​,​ ​(​)​ ​=> 
//  console​.​info​(​`Servidor rodando em http://localhost:​${​port​}​​`) 
//  ​)​; 




// const express = require("express");
// const mongoose = require("../Proj2-Integracao-BackEnd_MongoAtlas_Heroku/config/mongoose_config");
// const app = require("../Proj2-Integracao-BackEnd_MongoAtlas_Heroku/config/express_config");
// // const app = express(); // ta com erro, index fica vermelho
// const morgan = require("morgan");
// require("dotenv").config();

// app.listen(process.env.PORT);

// app.use(express.json());

// const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "API Rodando" });
// });

// const paisesRouter = require("./routes/paises.route");
// app.use("/paises", paisesRouter);

// const cidadesRouter = require("./routes/cidades.route");
// app.use("/cidades", cidadesRouter);

// const estadosRouter = require("./routes/estados.route");
// app.use("/estados", estadosRouter);

// app.listen(port, () => {
//   console.log(`Servidor rodando em: http://localhost:${port}`);
// });
