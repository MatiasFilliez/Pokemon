const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getPokeApi = async (prop) => {
    try {
        const allPokeOrFind = Array(prop ? 1 : 200).fill().map((_, i) => axios.get(`https://pokeapi.co/api/v2/pokemon/${prop ? prop : i + 1}`).then((response) => response.data)
        );
        return await Promise.all(allPokeOrFind).then((response) => {
            return response.map((poke) => ({
                id: poke.id,
                name: poke.name,
                hp: poke.stats[0].base_stat,
                force: poke.stats[1].base_stat,
                defending: poke.stats[2].base_stat,
                speed: poke.stats[5].base_stat,
                height: poke.height,
                weight: poke.weight,
                types: poke.types.map((prop) => ({ name: prop.type.name })),
                img: `https://www.professorlotus.com/Sprites/${poke.name}.gif` /* || poke.sprites.other["official-artwork"].front_default */
            }));
        });
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getPokeDb = async (prop) => {
    try {
        if (prop) {
            if (typeof prop === "number") {
                const findPokeDataBaseById = await Pokemon.findByPk(prop, {
                    include: { model: Type },
                });
                return findPokeDataBaseById;
            } else {
                const findPokeDatabase = await Pokemon.findOne({
                    where: { name: prop },
                });
                return findPokeDatabase ? findPokeDatabase : [];
            }
        } else {
            const dataBasePokemons = await Pokemon.findAll({
                include: {
                    model: Type
                },
            });
            return dataBasePokemons;
        }
    } catch (error) {
        console.log(error);
    }
};

const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;
        const findPoke = await getPokeDb(id);
        findPoke.length <= 0
            ? (await getPokeApi(id)).length > 0
                ? res.send(await getPokeApi(id))
                : res.send({ message: "pokemon not found" })
            : res.send(findPoke);
    } catch (error) {
        console.log(error);
    }
};

const getAllPokemons = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            const [dataDb, dataApi] = await Promise.all([getPokeDb(), getPokeApi()]);
            const data = [...dataDb, ...dataApi];
            res.send(data);
        } else {
            const prop = name.toLowerCase();
            const findPoke = await getPokeDb(prop);
            findPoke.length <= 0
                ? (await getPokeApi(prop)).length > 0
                    ? res.send(await getPokeApi(prop))
                    : res.send({ message: "pokemon not found" })
                : res.send(findPoke);
        }
    } catch (error) {
        console.log(error);
    }
};

const postPokemon = async (req, res) => {
    const { id, name, hp, force, defending, speed, height, weight, types, img } = req.body
    const pokemonCreated = await Pokemon.create({
        id, name, hp, force, defending, speed, height, weight, img
    })
    console.log(types)
    await pokemonCreated.addType(types)
    res.send(pokemonCreated)
}

module.exports = {
    getAllPokemons,
    getPokemonById,
    postPokemon
};
