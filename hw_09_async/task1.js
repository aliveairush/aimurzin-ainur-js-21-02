/**
 * TASK 1
 * Разработать скрипт. Пользователь вводит два числа (i, j),
 * каждую секунду выводить число от i до j (реализвать через setTimeout и setInterval)
 */

// TASK 1 версия через таймауты
function task1ThroughTimeout(i, j){
    let timer = setTimeout(function tick(from, to) {
        if (from <= to){
            console.log(from);
            timer = setTimeout(tick, 1000, ++from, to);
        }
    }, 1000, i,j);
}


// TASK 2 Версия через интервал
function task1ThroughInterval(i, j){
    let interval = setInterval(() => console.log(i++), 1000);

    setTimeout(()=> clearInterval(interval),(j-i+1)*1000);
}
