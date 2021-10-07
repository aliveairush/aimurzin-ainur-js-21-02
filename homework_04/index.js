/**
 * Написать скрипт, предлогающий пользователю ввести две строки через запятую.
 * Вывести сообщение true, если вторая строка содержится в первый, в противном случае false, регистр при проверке не учитывать.
 */
document.getElementById("task-1")
    .addEventListener("click", () => {
        const inputString = window.prompt("Пожалуйста введите две строки через запятую", "Осип охрип а Архип, осип");
        const regexStringAfterComma = /(?<=,).+/;


        let strAfterComma = String(inputString.match(regexStringAfterComma));
        strAfterComma = strAfterComma.trimStart();

        const regexStringBeforeComma = new RegExp(strAfterComma + ".+(?=,)", "i");
        alert(regexStringBeforeComma.test(inputString))
    });


/**
 Пользователь вводит строку, затем число (кол-во символов). Функция усекает строку до кол-ва символов и добавляет многоточие.
 */
document.getElementById("task-2")
    .addEventListener("click", () => {
        const inputString = window.prompt("Пожалуйста введите строку", "Я просто выгляжу как лось, а в душе я бабочка");
        const inputLength = window.prompt("Пожалуйста кол-во символов, до которого нужно урезать строку", "10");

        // 1) Обрезаем строку   2) Добавляем многоточие в конец
        alert(inputString.slice(0, inputLength).concat("..."));
    });

/**
 Написать функцию, преобразующее строку с датой и временем формата
 '12/02/2021 12-00' в строку формата 12.02.2021 12:00,
 используя регулярные выражения
 */
document.getElementById("task-3")
    .addEventListener("click", () => {
        const inputString = window.prompt("Пожалуйста введите дату c временем в формате 12/02/2021 12-00", "12/02/2021 12-00");

        // 1) Заменяем слэш на точку   2) Заменяем минус на двоеточие
        alert(inputString
            .replaceAll("/", ".")
            .replaceAll("-", ":"));
    });

/** Написать функцию, валидирующую ФИО из кирилличиских символов (считать, что отчество может оканчиваться только на "вна" или "вич" или может отсутствовать) */
document.getElementById("task-4")
    .addEventListener("click", () => {
        const inputString = window.prompt("Пожалуйста введите ваше ФИО", "Аймурзин Айнур Сергеевич");
        const regexp = /(^[а-я]+\s[а-я]+[а-я]$)|(([а-я]+\s){2}[а-я]+(вич|вна))/i;

        alert(regexp.test(inputString));
    });

/**
 На вход дана строка в CamelCase, преобразовать строку в snake_case
 */
document.getElementById("task-5")
    .addEventListener("click", () => {
        const inputString = window.prompt("Пожалуйста введите строку в camel case", "CamelCaseExampleTASK");
        const regexp = /(?<=\w)[A-Z]+/g

        const strWithUnderscores = inputString.replace(regexp, substring => "_".concat(substring));
        alert(strWithUnderscores.toLowerCase())
    });

/**
 * На вход даётся многострочная строка, найти и вернуть через alert все html комментарии
 */
document.getElementById("task-6")
    .addEventListener("click", () => {
        const inputText = document.getElementById("task-6-input").value;
        alert(inputText.match(/(?<=<!--).*(?=-->)/g));
    });


/** На вход дана строка, вернуть через alert все числа (десятичные разделяются сиволом ".") */
document.getElementById("task-7")
    .addEventListener("click", () => {
        const inputString = window.prompt("Пожалуйста введите строку с числами", "1Мы 2с2 тобой_3_одной крови — ты4.4 и я5");
        alert(inputString.match(/\d\.\d+|\d/g));
    });


/**   - Валидация введённого значения. Вводится идентификатор документа.
 Идентификатор должен состоять из четырёх частей по четыре символа,разделённых или не разделённых знаком "-".
 Допускаются только символы латинского алфавита и числа. Вывести через alert "ведётся поиск",
 при соответствии введённого значения, или "неверный илентификатор", при несоответствии.
 При несоответствии снова вывести форму для ввода строки. */

const validateForm = (message) =>{
    const inputString = window.prompt(message, "1aa1-b22b-3333-AcDc");
    const regex = /^([a-zA-Z0-9]{4}(-|\s)){3}[a-zA-Z0-9]{4}$/g;
    regex.test(inputString)? alert("Ведется поиск") : validateForm("Неверный илентификатор! Попробуйте снова:")
}
document.getElementById("task-8")
    .addEventListener("click", () => {
        validateForm("Пожалуйста введите строку из 4-ёх частей с 4-мя символами (Латиница)")
    });
