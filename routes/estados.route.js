const EstadoController = require("../controllers/estadoController");
const { Router } = require("express");
const router = Router();

router.post("/add", EstadoController.adicionar);
router.get("/listall", EstadoController.listar);
router.get("/listname/:nome", EstadoController.buscaPorNome);
router.delete("/delete/:nome", EstadoController.deletar);
router.put("/update/:nome", EstadoController.alterar);

module.exports = router;
