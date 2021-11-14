const CidadeController = require('../controllers/CidadesController');
const {Router} = require('express');
const router = Router();

router.post("/add", CidadeController.adicionar)
router.get("/listall", CidadeController.listar)
router.get("/listname/:nome", CidadeController.buscaPorNome)
router.delete("/delete/:nome", CidadeController.deletar)
router.put("/update/:nome", CidadeController.alterar)

module.exports = router