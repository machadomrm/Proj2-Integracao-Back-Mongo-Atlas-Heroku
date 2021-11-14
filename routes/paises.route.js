const PaisController = require("../controllers/PaisesController");
const { Router } = require("express");
const router = Router();

router.post("/add", PaisController.adicionar);
router.get("/listall", PaisController.listar);
router.get("/listname/:nome", PaisController.buscaPorNome);
router.delete("/delete/:nome", PaisController.deletar);
router.put("/update/:nome", PaisController.alterar);

module.exports = router;
