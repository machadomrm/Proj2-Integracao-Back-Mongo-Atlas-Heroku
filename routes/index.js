const paisesRoutes = require('./paisesRoutes');
const estadosRoutes = require('./estadosRoutes');
const cidadesRoutes = require('./cidadesRoutes');

module.exports = (app) => {
    app
    .use("/paises", paisesRoutes)
    .use("/estados", estadosRoutes)
    .use("/cidades", cidadesRoutes)
}