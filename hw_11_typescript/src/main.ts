import {swapi} from "./api/swapi";
import {createPeopleTable} from "./components/swapiComponents";
import './interfaces/Person'
import {internalStorage} from "./storage/internalStorage";
import {ListPeopleResponseData} from "./interfaces/ListPeopleResponseData";


import './listeners/tableSortListeners' // Добавление listeners для сортировки таблица
import './listeners/tableButtonListeners'// Добавление listeners для переключение между страницами


swapi.getPeople((response: ListPeopleResponseData) => {
    internalStorage.set('lastResponsePeopleData', response)
    createPeopleTable(response.results);
}, (error: any) => {console.error(error)});

