import { GET_ALL_POKEMON } from "../action";
export const initialState = {
    allPokemon: [],
}

const cases = {};

cases[GET_ALL_POKEMON] = (initialState, payload) => ({
    ...initialState,
    allPokemon: [...payload]
})


export default function rootReducer(state = initialState, { type, payload }) {
    return cases[type] ? cases[type](state, payload) : state;
}