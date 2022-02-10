const { Router } = require("express");
const routePokemon = require("./pokemon")
const routeType = require("./type")
const authUser = require("./auth");
/* const { auth } = require("../controllers/cAuth"); */
const router = Router();

router.use('/pokemon', routePokemon)
router.use('/type', routeType)
router.use('/', authUser)

module.exports = router;
