import {createFetch} from "../utils/fetchUtils";
import {MAIN_URL, PEOPLE_URL} from "../constans/swapi";

export const swapi = {
    getMain: createFetch(MAIN_URL),
    getPeople: createFetch(PEOPLE_URL),
}