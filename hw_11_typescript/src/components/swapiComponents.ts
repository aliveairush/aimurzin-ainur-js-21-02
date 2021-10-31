import {Person} from "../interfaces/Person";


export const createPersonTableRow = (name: string, height: number, mass: number, gender: string) => {
    const tableRow = document.createElement('tr')
    tableRow.innerHTML = `<td>${name}</td><td>${height}</td><td>${mass}</td><td>${gender}</td>`;

    return tableRow;
}


export const createPeopleTable = (peopleArray: Array<any>, sort?: (a: Person, b: Person) => number) => {
    const tbody = document.getElementById("table").getElementsByTagName("tbody")[0];
    tbody.innerHTML = '';


    if (typeof sort !== 'undefined'){
        peopleArray.sort(sort);
    }
    peopleArray.forEach(person => {
        tbody.append(createPersonTableRow(person.name, person.height, person.mass, person.gender))
    });
    return tbody;
}
