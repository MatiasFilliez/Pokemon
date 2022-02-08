const { Router } = require('express');
const { singIn, singUp } = require('../../controllers/cAuth');


const router = Router()

router.post('/singin', singIn)
router.post('/singup', singUp)

module.exports = router