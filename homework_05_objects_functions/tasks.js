/**
 * TASK 1
 * На вход поступает массив, вывести массив, удалив неуникальные значения.
 */
function task1(array) {
    console.log(Array.from(new Set(array)));
}

const arrayTask1 = [6, 1, 2, 3, 4, 5, 2, 4];
// console.log("\n\n***  Task 1   ***")
// task1(arrayTask1);


/**
 * TASK 2
 На вход поступает массив, реверсировать значения (подобно методу reverse) метод reverse не использовать.
 */
function task2(array) {
    const reversedArray = new Array(array.length);
    array.forEach((val, index) => reversedArray[array.length - 1 - index] = val);
    console.log(reversedArray);
}

const arrayTask2 = [6, 1, 2, 3, 4, 5, 2, 4];
// console.log("\n\n***  Task 2   ***")
// task2(arrayTask2);


/**
 * TASK 3
 *  На вход поступает массив, содержащий массивы, в которых хранится два элемента.
 *  Преобразовать массив в объект, где ключами являются нулевой индекс вложенныхых массивов
 *  , а значениями являются элементы с индексом один.
 */
function task3(array) {
    console.log(Object.fromEntries(array));
}

const arrayTask3 = [[1, 2], [3, 4], [5, 6], [7, 8]];
// console.log("\n\n***  Task 3   ***")
// task3(arrayTask3);


/**
 * TASK 4
 *  На вход поступает объект, вывести сумму числовых свойств объекта.
 */
function task4(object) {
    const sum = Object.values(object)
        .filter(val => typeof val === "number")
        .reduce((accumulator, val) => {
            return accumulator + val
        }, 0);

    console.log(`Task 4 result: ${sum}`);
}

const myObjectTask4 = {
    age: 10,
    experience: 20,
    name: "Ainur"
}

// console.log("\n\n***  Task 4   ***")
// task4(myObjectTask4);


/**
 * TASK 5
 * На вход поступает массив с числами, вывести среднее арифметическое элементов массива.
 */
function task5(array) {
    const sum = array.reduce((accumulator, item) => {
        return accumulator + item
    }, 0);
    console.log(`Task 5 result: ${sum / array.length}`);
}

// const arrayTask5 = [1,2,3,4,5];
// task5(arrayTask5)


/**
 * TASK 6
 *  Создать функцию-конструктор для объекта "калькулятор", объект должен иметь поле,
 *  хранящее текущее значение и методы сложения, вычитания,
 *  умножения и деления, принимающие число и манипулирующий свойством значения в соответствии с назначением метода
 *  , а так же функцию, сбрасывающую значение в ноль.
 */
function Calculator() {
    this.currentValue = 0;
    this.plus = function (val) {
        return this.currentValue += val;
    }

    this.minus = function (val) {
        return this.currentValue -= val;
    }

    this.multiply = function (val) {
        return this.currentValue *= val;
    }

    this.divide = function (val) {
        return this.currentValue /= val;
    }

    this.reset = function () {
        return this.currentValue = 0;
    }
}

const calculator = new Calculator();

// console.log(calculator)


/** TASK 7
 *  Функция принимает смешанный массив (содержащий значения чисел, строк и объектов),
 *  вернуть объект с полями numbers, strings и objects,
 *  содержащими массив со значениями, соответствующими названию поля.
 */
function task7(array) {
    const resultObject = {
        numbers: [],
        strings: [],
        objects: []
    }

    array.forEach(item => {
        if (typeof item === "number") resultObject.numbers.push(item)
        if (typeof item === "string") resultObject.strings.push(item)
        if (typeof item === "object") resultObject.objects.push(item)
    })

    return resultObject;
}

const arrayTask7 = [5, 6, "Luter", "King", {id: 1, name: "Ainur"}, {id: 2, name: "Christopher"}];

// console.log(task7(arrayTask7));


/** TASK 8
 *  Функция принимает массив чисел и два числовых значения, вернуть новый массив,
 *  содержащий элементы первого массива, значение которых попадает под диапазон переданных в функцию чисел
 *  (второе переданное число может быть больше первого)
 */
function task8(array, start, end) {
    return array.slice(start, end);
}

const arrayTask8 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// console.log(task8(arrayTask8, 3,7));


/** TASK 9
 *  Функция принимает две строки. Вывести true, если строки являются анаграммами, в противном случае false
 */
function task9(str1, str2) {
    if (str1.length !== str2.length) return false // Если строки не равны по длинне нет смысла их сравнивать
    else {
        const chars1 = str1.split(""); // Преобразуем строки в массивы
        const chars2 = str2.split("");

        /* Логика следующая: Проходим по первому массиву 1 и пытаемся найти индекс такого же символа в массиве 2,
          если индекс не нашёлся (=-1) то возвращаем false.
          Если же все таки такой символ нашелся, тогда удаляем его с массива два, чтобы пометить что он уже был использован.
          Если every пройдет полностью значит все символы первого массива были во втором массиве. */
        return chars1.every(char => {
            const indexInSecondWord = chars2.indexOf(char);
            if (indexInSecondWord === -1)
                return false;
            chars2[indexInSecondWord] = null;
            return true;
        });
    }
}


/** TASK 10
 *  Создать объект, выводящий в консоль все ключи и значения объекта в формате "ключ: значение" через запятую
 *  (считать, что значением ключа объекта не может быть объектом или массивом, содержащими объекты)
 *  сама функция в консоль выводиться не должна.
 */
function task10(obj) {
    const entriesLength = Object.entries(obj).length;
    Object.entries(obj)
        .forEach( ([key, val], index) =>
            index !== (entriesLength -1) ? console.log(`${key}: ${val},`) : console.log(`${key}: ${val}`)
        );
}

const objTask10 = {
    id: 1,
    age: 12,
    name: "Max",
    login: "Seremax"
}



/** TASK 11
 Создать функцию-конструктор для объекта, содержащего методы setProp (установить значение свойства),
 метод принимает ключ (строка), значение (произвольное)
 и объект со свойствами writable, configurable, enumerable
 (разрешение перезаписи свойства, разрешение перечисления свойства и разрешение удаления свойства).
 Если какое-то из свойств в объекте отсутствует, действие должно быть разрешено
 */

function ObjectTask11(key, val, properties){
    Object.defineProperties(this, {
        [key]: {
            value: val,
            writable: properties.writable ? properties.writable : false,
            configurable: properties.configurable ? properties.configurable : false,
            enumerable: properties.enumerable ? properties.enumerable : false
        }
    })
}

const objForTask11 = new ObjectTask11("name", "Carl V", {writable: false, enumerable: true});
// Object.getOwnPropertyDescriptor(objForTask11, "name")