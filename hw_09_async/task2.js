
// Cнипет для опциональной задачи, https://gist.github.com/realmyst/1262561
function secDeclination(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

/**
 * Task 2
 * Реализовать страницу, через десять секунд перенаправляющую на главную страницу https://maxima.life
 * (для редиректа поменять свойство window.location) на странице вывести сообщение
 * "вы будите перенаправлены через /количество оставшихся секунд/" секунд
 * *Опционально: предусмотреть склонение слова "секунда"
 */
const labelElem = document.getElementById("label");
let timer = 10;
labelElem.innerText = `Вы будите перенаправлены через ${timer--} секунд`;

let interval = setInterval(() => {
    const sec = secDeclination(timer, ['секунду', 'секунды', 'секунд'])
    labelElem.innerText = `Вы будите перенаправлены через ${timer--} ${sec}`;
}, 1000);

setTimeout(() => {
    clearInterval(interval);
    window.location.href = "https://maxima.life";
}, (timer+1) * 1000);
