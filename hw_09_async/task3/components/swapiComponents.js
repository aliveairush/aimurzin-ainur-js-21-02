export const createPersonTableRow = (name, height, mass, gender) => {
    const tableRow = document.createElement('tr')
    tableRow.innerHTML = `<td>${name}</td><td>${height}</td><td>${mass}</td><td>${gender}</td>`
    return tableRow;
}


export const createPeopleTable = (peopleArray) => {
    const tbody = document.getElementById("table").getElementsByTagName("tbody")[0];
    tbody.innerHTML = '';
    peopleArray.forEach(person => {
        tbody.append(createPersonTableRow(person.name, person.height, person.mass, person.gender))
    });
    return tbody;
}

export const createSortedPeopleTable = (peopleArray, sort) => {
    const tbody = document.getElementById("table").getElementsByTagName("tbody")[0];
    tbody.innerHTML = '';
    peopleArray
        .sort(sort)
        .forEach(person => {
            tbody.append(createPersonTableRow(person.name, person.height, person.mass, person.gender))
        });
    return tbody;
}