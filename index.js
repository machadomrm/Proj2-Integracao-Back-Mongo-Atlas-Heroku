const express = require("express");
const mongoose = require("../Proj2-Integracao-BackEnd_MongoAtlas_Heroku/config/mongoose_config");
const app = require("../Proj2-Integracao-BackEnd_MongoAtlas_Heroku/config/express_config");

app.listen(process.env.PORT);
