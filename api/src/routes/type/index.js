const { Router } = require("express");
const { getTypes } = require("../../controllers/cType");

const router = Router();

router.get('/', getTypes)

module.exports = router;