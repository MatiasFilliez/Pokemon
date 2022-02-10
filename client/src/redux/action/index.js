import axios from "axios"
export const GET_ALL_POKEMON = "GET_ALL_POKEMON"
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME"


export const getAllPokemons = async (dispatch) => {
    try {
        const { data } = await axios.get("http://localhost:3001/api/pokemon")
        dispatch({ type: GET_ALL_POKEMON, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getPokemonByName = (name) => {
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/api/pokemon?name=${name}`)
            dispatch({ type: GET_POKEMON_BY_NAME, payload: data })
        }
    } catch (error) {
        console.log(error)
    }
}