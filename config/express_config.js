const express = require("express");
const db = require("./mongoose_config");
const consign = require("consign");

class App {
  constructor() {
    this.init = express();
    this.db = db;
    this.envVar();
    this.midd();
    this.routes();
  }

  envVar(){
      this.init.set('port', process.env.PORT);
  }
  
  midd() {
    this.init.use(express.json());
  }

  routes() {
    consign({ cwd: "api" }).include("routes/index.js").into(this.init);
  }
}

module.exports = new App().init;
