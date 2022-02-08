const { Router } = require('express');
const { getAllPokemons,
    getPokemonById,
    postPokemon
} = require('../../controllers/cPokemon');

const router = Router()

router.get('/', getAllPokemons)
router.get('/:id', getPokemonById)
router.post('/', postPokemon)

module.exports = router