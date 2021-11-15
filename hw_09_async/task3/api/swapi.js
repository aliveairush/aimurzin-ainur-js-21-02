import {createFetch} from "../utils/fetchUtils.mjs";
import {MAIN_URL, PEOPLE_URL} from "../constans/swapi.js";

export const swapi = {
    getMain: createFetch(MAIN_URL),
    getPeople: createFetch(PEOPLE_URL),
}