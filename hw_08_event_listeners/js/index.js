/**
 * Task: Валидируемые инпуты username & phone.
 */
const usernameRegexp = /^[а-я]*$/g;
let username = '';
const phoneRegexp = /^[0-9]*$/g;
let phone = '';

document.getElementById("username").addEventListener('input', (event) => {
        const inputValue = event.target.value;
        if (inputValue.match(usernameRegexp)) {
                username = inputValue;
        }
        event.target.value = username;

});

document.getElementById("phone").addEventListener('input', (event) => {
        const inputValue = event.target.value;
        if (inputValue.match(phoneRegexp)) {
                phone = inputValue;
        }
        event.target.value = phone;
});



 /** Task
  Реализация добавления в таблицу строки с именем и номером телефона.
  */
 document.getElementById('add-user')
    .addEventListener('click', event => {
        const usernameElem = document.getElementById("username");
        const phoneElem = document.getElementById("phone");

        const newTableRow = document.createElement('tr');
        newTableRow.innerHTML = `<td>${usernameElem.value}</td><td>${phoneElem.value}</td><td><button>X</button></td>`;

        const tableElem = document.getElementsByTagName("table")[0];
        tableElem.appendChild(newTableRow);

        usernameElem.value = "";
        phoneElem.value = "";
        phone = "";
        username = "";
    });

/**
 * Task: Добавить три кнопки, для смены цветового оформления таблицы (каждая меняет цвет фона и текста, цвета на выбор слушателей).
 */
/* Три кнопки поместил в один див и навесил на него listener.
Всем трем кнопкам добавил атрибут theme-number, по умолчанию у таблицы тема 1, если нажимаем на кнопки,
то класс таблицы заменяется на одну цифру (theme-number).
 */
document.getElementById("switch-theme-panel").addEventListener('click', ev => {
        tableElem = document.getElementsByTagName("table")[0];
        const themeNumber = ev.target.getAttribute('theme-number');
        tableElem.className = tableElem.className.replace(/my-table_theme-./, `my-table_theme-${themeNumber}`);
});

/**
 * Task: реализовать в каждой строке таблицы кнопку для удаление её строки из таблицы
 */
document.getElementsByTagName("table")[0].addEventListener('click', ev => {
        if(ev.target.tagName === 'BUTTON'){
                ev.target.parentElement.parentElement.remove();
        }
})


