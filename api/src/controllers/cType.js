const axios = require("axios");
const { Type } = require("../db");

const getTypes = async (req, res) => {
    await dbTypes()
    const allTypes = await Type.findAll()
    res.send(allTypes)
}

const dbTypes = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/type")
    await data.results.map((e) => Type.findOrCreate({
        where: { name: e.name }
    })
    )
}

module.exports = getTypes