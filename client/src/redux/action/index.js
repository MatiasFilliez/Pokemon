import axios from "axios"
export const GET_ALL_POKEMON = "GET_ALL_POKEMON"

export const getAllPokemons = async (dispatch) => {
    try {
        const { data } = await axios.get("http://localhost:3001/api/pokemon")
        dispatch({ type: GET_ALL_POKEMON, payload: data })
    } catch (error) {
        console.log(error)
    }
}