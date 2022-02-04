const { Router } = require("express");

const routePokemon = require("./pokemon/index")
const routeType = require("./type/index")

const router = Router();

router.use('/pokemon', routePokemon)
router.use('/type', routeType)

module.exports = router;
