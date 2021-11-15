const paisesRoutes = require("./paises.route");
const estadosRoutes = require("./estados.route");
const cidadesRoutes = require("./cidades.route");

module.exports = (app) => {
  app
    .use("/paises", paisesRoutes)
    .use("/estados", estadosRoutes)
    .use("/cidades", cidadesRoutes);
};
