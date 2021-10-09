/**
 * Task 1
 */
function fib1(number) {
    if (number === 0) return 0
    if (number === 1) return 1
    else {
        return fib1(number - 1) + fib1(number - 2)
    }
}

/**
 * Task 2
 */
const fib2 = (() => {
    const cache = new Map([[0, 0], [1, 1]]);
    return (number) => {
        if (cache.has(number))
            return cache.get(number);
        else {
            const fibRes = fib2(number - 1) + fib2(number - 2);
            cache.set(number, fibRes)
            return fibRes;
        }
    }
})()


/**
 * Task 3
 * Разработать рекурсивную функцию, принимающую массив,
 * содержащий массивы из двух элементов, в каждом из которых первый элемент является строкой,
 * а второй строкой, числом, логическим значением, объектом, или таким же массивом.
 * Функция должна преобразовать массив в объект
 */

const convertArrayToObj = ((array) => {
    const obj = {};
    return () => {
        if (!Array.isArray(array))       // Удостоверяемся что это массив, если не массив то возвращаем значение
            return array;
        if (array.length === 2 && typeof array[0] === "string")       // Если текущий массив из двух элементов и первый из низ строка,  значит нужно преобразовать в объект  */
            obj[array[0]] = convertArrayToObj(array[1])();          // Второй параметр может быть массивом, если и нет то просто вернется значение
        else  // Раз у нас больше 2 элементов то для каждого элемента вызываем рекурсивно функцию конвертации
            array.forEach(item => obj[item[0]] = convertArrayToObj(item[1])())
        return obj;
    }
});

const arrayTask3 = [
    ["name", "Anna"],
    ["age", 22],
    ["isMarried", false],
    ["pets", [
        ["dog", "Faust"],
        ["cat", "Balthazar"],
        ["snake", ["type", [["property", "dokidoki wakuwaku"]]]]
    ]
    ],
    ["address", {
        "post1": [1, 2],
        "post2": [3, 4, 5],
    }]
];

convertArrayToObj(arrayTask3)();


