import {swapi} from "./api/swapi.js";
import {createPeopleTable, createSortedPeopleTable} from "./components/swapiComponents.js";
import {createFetch} from "./utils/fetchUtils.mjs";

/**
 * Реализовать страницу с таблицей.
 * Таблица должна содержать инфрмацию, полученную по API https://swapi.dev/api/people/
 * (массив объектов в свойстве "results"). А именно росте, весе и поле персонажей
 * (поля "name", "height", "mass" и "gender" соответственно).
 *
 * *Опционально: предусмотреть возможность сортировки таблицы
 * *Опционально: предусмотреть возможность перехода к следующей странице (ссылка содержится в объекте API в свойстве "next")
 * и предыдущей странице (ссылка содержится в объекте API в свойстве "previous")
 */

let currentTableData;

swapi.getPeople(response => {
    currentTableData = response;
    createPeopleTable(currentTableData.results);
});


/**
 *Опционально: предусмотреть возможность сортировки таблицы
 */
let isSorAsc = true; // Для переключение между сортировку по убыванию или по возрастанию

document.getElementById('col-name').addEventListener('click', () => {
    const sortType = isSorAsc ? ((a, b) => a.name > b.name ? 1 : -1) : ((a, b) => a.name < b.name ? 1 : -1);
    isSorAsc = !isSorAsc;
    createSortedPeopleTable(currentTableData.results, sortType)
});

document.getElementById('col-mass').addEventListener('click', () => {
    const sortType = isSorAsc ? ((a, b) => a.mass - b.mass) : ((a, b) => b.mass - a.mass);
    isSorAsc = !isSorAsc;
    createSortedPeopleTable(currentTableData.results, sortType)
});

document.getElementById('col-height').addEventListener('click', () => {
    const sortType = isSorAsc ? ((a, b) => a.height - b.height) : ((a, b) => b.height - a.height);
    isSorAsc = !isSorAsc;
    createSortedPeopleTable(currentTableData.results, sortType)
});

document.getElementById('col-gender').addEventListener('click', () => {
    // Выберим тип сортировки по возрастанию или убиванию
    const sortType = isSorAsc ? ((a, b) => a.gender > b.gender ? 1 : -1) : ((a, b) => a.gender < b.gender ? 1 : -1);
    isSorAsc = !isSorAsc;
    createSortedPeopleTable(currentTableData.results, sortType)
});


/**
 * *Опционально: предусмотреть возможность перехода к следующей странице (ссылка содержится в объекте API в свойстве "next")
 * и предыдущей странице (ссылка содержится в объекте API в свойстве "previous")
 */
document.getElementById('btn-next').addEventListener('click', () => {
    createFetch(currentTableData.next)(response => {
        currentTableData = response;
        createPeopleTable(currentTableData.results);
    });
});

document.getElementById('btn-prev').addEventListener('click', () => {
    createFetch(currentTableData.previous)(response => {
        currentTableData = response;
        createPeopleTable(currentTableData.results);
    });
});