/**
 *Опционально: предусмотреть возможность сортировки таблицы
 */

import {Person} from "../interfaces/Person";
import {createPeopleTable} from "../components/swapiComponents";
import {internalStorage} from "../storage/internalStorage";


let isSorAsc: boolean = true; // Для переключение между сортировку по убыванию или по возрастанию

document.getElementById('col-name').addEventListener('click', () => {
    const sortType = isSorAsc ? ((a: Person, b: Person) => a.name > b.name ? 1 : -1) : ((a: Person, b: Person) => a.name < b.name ? 1 : -1);
    isSorAsc = !isSorAsc;
    createPeopleTable(internalStorage.get("lastResponsePeopleData").results, sortType)
});

document.getElementById('col-mass').addEventListener('click', () => {
    const sortType = isSorAsc ? ((a: Person, b: Person) => {
        if (a.mass == 'unknown') return 1;
        else return a.mass - b.mass
    }) : ((a: Person, b: Person) => {
        if (b.mass == 'unknown') return -1;
        else return b.mass - a.mass
    });
    isSorAsc = !isSorAsc;
    createPeopleTable(internalStorage.get("lastResponsePeopleData").results, sortType)
});

document.getElementById('col-height').addEventListener('click', () => {
    const sortType = isSorAsc ? ((a: Person, b: Person) => a.height - b.height) : ((a: Person, b: Person) => b.height - a.height);
    isSorAsc = !isSorAsc;
    createPeopleTable(internalStorage.get("lastResponsePeopleData").results, sortType)
});

document.getElementById('col-gender').addEventListener('click', () => {
    const sortType = isSorAsc ? ((a: Person, b: Person) => a.gender > b.gender ? 1 : -1) : ((a: Person, b: Person) => a.gender < b.gender ? 1 : -1);
    isSorAsc = !isSorAsc;
    createPeopleTable(internalStorage.get("lastResponsePeopleData").results, sortType)
});