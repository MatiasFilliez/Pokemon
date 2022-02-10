import { GET_ALL_POKEMON, GET_POKEMON_BY_NAME } from "../action";
export const initialState = {
    allPokemon: [],
    poke: []
}

const cases = {};

cases[GET_ALL_POKEMON] = (initialState, payload) =>
    ({ ...initialState, allPokemon: [...payload] })

cases[GET_POKEMON_BY_NAME] = (initialState, payload) => (
    ({ ...initialState, poke: [...payload] }))


export default function rootReducer(state = initialState, { type, payload }) {
    return cases[type] ? cases[type](state, payload) : state;
}