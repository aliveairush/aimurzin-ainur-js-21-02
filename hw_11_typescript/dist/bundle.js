(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swapi = void 0;
var fetchUtils_1 = require("../utils/fetchUtils");
var swapi_1 = require("../constans/swapi");
exports.swapi = {
    getMain: (0, fetchUtils_1.createFetch)(swapi_1.MAIN_URL),
    getPeople: (0, fetchUtils_1.createFetch)(swapi_1.PEOPLE_URL),
};

},{"../constans/swapi":3,"../utils/fetchUtils":9}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPeopleTable = exports.createPersonTableRow = void 0;
var createPersonTableRow = function (name, height, mass, gender) {
    var tableRow = document.createElement('tr');
    tableRow.innerHTML = "<td>" + name + "</td><td>" + height + "</td><td>" + mass + "</td><td>" + gender + "</td>";
    return tableRow;
};
exports.createPersonTableRow = createPersonTableRow;
var createPeopleTable = function (peopleArray, sort) {
    var tbody = document.getElementById("table").getElementsByTagName("tbody")[0];
    tbody.innerHTML = '';
    if (typeof sort !== 'undefined') {
        peopleArray.sort(sort);
    }
    peopleArray.forEach(function (person) {
        tbody.append((0, exports.createPersonTableRow)(person.name, person.height, person.mass, person.gender));
    });
    return tbody;
};
exports.createPeopleTable = createPeopleTable;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PEOPLE_URL = exports.MAIN_URL = void 0;
exports.MAIN_URL = 'https://swapi.dev/api/';
exports.PEOPLE_URL = 'https://swapi.dev/api/people/';

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetchUtils_1 = require("../utils/fetchUtils");
var internalStorage_1 = require("../storage/internalStorage");
var swapiComponents_1 = require("../components/swapiComponents");
/**
 * *Опционально: предусмотреть возможность перехода к следующей странице (ссылка содержится в объекте API в свойстве "next")
 * и предыдущей странице (ссылка содержится в объекте API в свойстве "previous")
 */
document.getElementById('btn-next').addEventListener('click', function () {
    (0, fetchUtils_1.createFetch)(internalStorage_1.internalStorage.get("lastResponsePeopleData").next)(function (response) {
        internalStorage_1.internalStorage.set("lastResponsePeopleData", response);
        (0, swapiComponents_1.createPeopleTable)(response.results);
    }, function (error) {
        console.error(error);
    });
});
document.getElementById('btn-prev').addEventListener('click', function () {
    (0, fetchUtils_1.createFetch)(internalStorage_1.internalStorage.get("lastResponsePeopleData").previous)(function (response) {
        internalStorage_1.internalStorage.set("lastResponsePeopleData", response);
        (0, swapiComponents_1.createPeopleTable)(response.results);
    }, function (error) {
        console.error(error);
    });
});

},{"../components/swapiComponents":2,"../storage/internalStorage":8,"../utils/fetchUtils":9}],6:[function(require,module,exports){
"use strict";
/**
 *Опционально: предусмотреть возможность сортировки таблицы
 */
Object.defineProperty(exports, "__esModule", { value: true });
var swapiComponents_1 = require("../components/swapiComponents");
var internalStorage_1 = require("../storage/internalStorage");
var isSorAsc = true; // Для переключение между сортировку по убыванию или по возрастанию
document.getElementById('col-name').addEventListener('click', function () {
    var sortType = isSorAsc ? (function (a, b) { return a.name > b.name ? 1 : -1; }) : (function (a, b) { return a.name < b.name ? 1 : -1; });
    isSorAsc = !isSorAsc;
    (0, swapiComponents_1.createPeopleTable)(internalStorage_1.internalStorage.get("lastResponsePeopleData").results, sortType);
});
document.getElementById('col-mass').addEventListener('click', function () {
    var sortType = isSorAsc ? (function (a, b) {
        if (a.mass === 'unknown')
            return 1;
        else
            return a.mass - b.mass;
    }) : (function (a, b) {
        if (b.mass === 'unknown')
            return -1;
        else
            return b.mass - a.mass;
    });
    isSorAsc = !isSorAsc;
    (0, swapiComponents_1.createPeopleTable)(internalStorage_1.internalStorage.get("lastResponsePeopleData").results, sortType);
});
document.getElementById('col-height').addEventListener('click', function () {
    var sortType = isSorAsc ? (function (a, b) { return a.height - b.height; }) : (function (a, b) { return b.height - a.height; });
    isSorAsc = !isSorAsc;
    (0, swapiComponents_1.createPeopleTable)(internalStorage_1.internalStorage.get("lastResponsePeopleData").results, sortType);
});
document.getElementById('col-gender').addEventListener('click', function () {
    var sortType = isSorAsc ? (function (a, b) { return a.gender > b.gender ? 1 : -1; }) : (function (a, b) { return a.gender < b.gender ? 1 : -1; });
    isSorAsc = !isSorAsc;
    (0, swapiComponents_1.createPeopleTable)(internalStorage_1.internalStorage.get("lastResponsePeopleData").results, sortType);
});

},{"../components/swapiComponents":2,"../storage/internalStorage":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swapi_1 = require("./api/swapi");
var swapiComponents_1 = require("./components/swapiComponents");
require("./interfaces/Person");
var internalStorage_1 = require("./storage/internalStorage");
require("./listeners/tableSortListeners"); // Добавление listeners для сортировки таблица
require("./listeners/tableButtonListeners"); // Добавление listeners для переключение между страницами
swapi_1.swapi.getPeople(function (response) {
    internalStorage_1.internalStorage.set('lastResponsePeopleData', response);
    (0, swapiComponents_1.createPeopleTable)(response.results);
}, function (error) { console.error(error); });

},{"./api/swapi":1,"./components/swapiComponents":2,"./interfaces/Person":4,"./listeners/tableButtonListeners":5,"./listeners/tableSortListeners":6,"./storage/internalStorage":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalStorage = void 0;
exports.internalStorage = new Map();

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFetch = void 0;
var createFetch = function (url) { return function (callback, errorCallback) {
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(callback)
        .catch(errorCallback);
}; };
exports.createFetch = createFetch;

},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBpL3N3YXBpLnRzIiwic3JjL2NvbXBvbmVudHMvc3dhcGlDb21wb25lbnRzLnRzIiwic3JjL2NvbnN0YW5zL3N3YXBpLnRzIiwic3JjL2xpc3RlbmVycy90YWJsZUJ1dHRvbkxpc3RlbmVycy50cyIsInNyYy9saXN0ZW5lcnMvdGFibGVTb3J0TGlzdGVuZXJzLnRzIiwic3JjL21haW4udHMiLCJzcmMvc3RvcmFnZS9pbnRlcm5hbFN0b3JhZ2UudHMiLCJzcmMvdXRpbHMvZmV0Y2hVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0FBLGtEQUFnRDtBQUNoRCwyQ0FBdUQ7QUFFMUMsUUFBQSxLQUFLLEdBQUc7SUFDakIsT0FBTyxFQUFFLElBQUEsd0JBQVcsRUFBQyxnQkFBUSxDQUFDO0lBQzlCLFNBQVMsRUFBRSxJQUFBLHdCQUFXLEVBQUMsa0JBQVUsQ0FBQztDQUNyQyxDQUFBOzs7Ozs7QUNITSxJQUFNLG9CQUFvQixHQUFHLFVBQUMsSUFBWSxFQUFFLE1BQWMsRUFBRSxJQUFZLEVBQUUsTUFBYztJQUMzRixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsU0FBTyxJQUFJLGlCQUFZLE1BQU0saUJBQVksSUFBSSxpQkFBWSxNQUFNLFVBQU8sQ0FBQztJQUU1RixPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDLENBQUE7QUFMWSxRQUFBLG9CQUFvQix3QkFLaEM7QUFHTSxJQUFNLGlCQUFpQixHQUFHLFVBQUMsV0FBdUIsRUFBRSxJQUF1QztJQUM5RixJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLEtBQUssQ0FBQyxTQUFTLEdBQUcs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LENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7Ozs7OztBQ2Q5QixRQUFBLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUNBbEMsSUFBTSxXQUFXLEdBQUcsVUFBQyxHQUFXLElBQU0sT0FBQSxVQUFDLFFBQWEsRUFBRSxhQUFrQjtJQUN2RSxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ0wsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQztTQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ2QsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsRUFMNEMsQ0FLNUMsQ0FBQTtBQUxZLFFBQUEsV0FBVyxlQUt2QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7Y3JlYXRlRmV0Y2h9IGZyb20gXCIuLi91dGlscy9mZXRjaFV0aWxzXCI7XG5pbXBvcnQge01BSU5fVVJMLCBQRU9QTEVfVVJMfSBmcm9tIFwiLi4vY29uc3RhbnMvc3dhcGlcIjtcblxuZXhwb3J0IGNvbnN0IHN3YXBpID0ge1xuICAgIGdldE1haW46IGNyZWF0ZUZldGNoKE1BSU5fVVJMKSxcbiAgICBnZXRQZW9wbGU6IGNyZWF0ZUZldGNoKFBFT1BMRV9VUkwpLFxufSIsImltcG9ydCB7UGVyc29ufSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9QZXJzb25cIjtcblxuXG5leHBvcnQgY29uc3QgY3JlYXRlUGVyc29uVGFibGVSb3cgPSAobmFtZTogc3RyaW5nLCBoZWlnaHQ6IG51bWJlciwgbWFzczogbnVtYmVyLCBnZW5kZXI6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHRhYmxlUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuICAgIHRhYmxlUm93LmlubmVySFRNTCA9IGA8dGQ+JHtuYW1lfTwvdGQ+PHRkPiR7aGVpZ2h0fTwvdGQ+PHRkPiR7bWFzc308L3RkPjx0ZD4ke2dlbmRlcn08L3RkPmA7XG5cbiAgICByZXR1cm4gdGFibGVSb3c7XG59XG5cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBlb3BsZVRhYmxlID0gKHBlb3BsZUFycmF5OiBBcnJheTxhbnk+LCBzb3J0PzogKGE6IFBlcnNvbiwgYjogUGVyc29uKSA9PiBudW1iZXIpID0+IHtcbiAgICBjb25zdCB0Ym9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFibGVcIikuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0Ym9keVwiKVswXTtcbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcblxuXG4gICAgaWYgKHR5cGVvZiBzb3J0ICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAgIHBlb3BsZUFycmF5LnNvcnQoc29ydCk7XG4gICAgfVxuICAgIHBlb3BsZUFycmF5LmZvckVhY2gocGVyc29uID0+IHtcbiAgICAgICAgdGJvZHkuYXBwZW5kKGNyZWF0ZVBlcnNvblRhYmxlUm93KHBlcnNvbi5uYW1lLCBwZXJzb24uaGVpZ2h0LCBwZXJzb24ubWFzcywgcGVyc29uLmdlbmRlcikpXG4gICAgfSk7XG4gICAgcmV0dXJuIHRib2R5O1xufVxuIiwiZXhwb3J0IGNvbnN0IE1BSU5fVVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly9zd2FwaS5kZXYvYXBpLydcbmV4cG9ydCBjb25zdCBQRU9QTEVfVVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8nIiwiaW1wb3J0IHtjcmVhdGVGZXRjaH0gZnJvbSBcIi4uL3V0aWxzL2ZldGNoVXRpbHNcIjtcbmltcG9ydCB7aW50ZXJuYWxTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9pbnRlcm5hbFN0b3JhZ2VcIjtcbmltcG9ydCB7Y3JlYXRlUGVvcGxlVGFibGV9IGZyb20gXCIuLi9jb21wb25lbnRzL3N3YXBpQ29tcG9uZW50c1wiO1xuaW1wb3J0IHtMaXN0UGVvcGxlUmVzcG9uc2VEYXRhfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9MaXN0UGVvcGxlUmVzcG9uc2VEYXRhXCI7XG5cbi8qKlxuICogKtCe0L/RhtC40L7QvdCw0LvRjNC90L46INC/0YDQtdC00YPRgdC80L7RgtGA0LXRgtGMINCy0L7Qt9C80L7QttC90L7RgdGC0Ywg0L/QtdGA0LXRhdC+0LTQsCDQuiDRgdC70LXQtNGD0Y7RidC10Lkg0YHRgtGA0LDQvdC40YbQtSAo0YHRgdGL0LvQutCwINGB0L7QtNC10YDQttC40YLRgdGPINCyINC+0LHRitC10LrRgtC1IEFQSSDQsiDRgdCy0L7QudGB0YLQstC1IFwibmV4dFwiKVxuICog0Lgg0L/RgNC10LTRi9C00YPRidC10Lkg0YHRgtGA0LDQvdC40YbQtSAo0YHRgdGL0LvQutCwINGB0L7QtNC10YDQttC40YLRgdGPINCyINC+0LHRitC10LrRgtC1IEFQSSDQsiDRgdCy0L7QudGB0YLQstC1IFwicHJldmlvdXNcIilcbiAqL1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1uZXh0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY3JlYXRlRmV0Y2goaW50ZXJuYWxTdG9yYWdlLmdldChcImxhc3RSZXNwb25zZVBlb3BsZURhdGFcIikubmV4dCkoKHJlc3BvbnNlOiBMaXN0UGVvcGxlUmVzcG9uc2VEYXRhKSA9PiB7XG4gICAgICAgIGludGVybmFsU3RvcmFnZS5zZXQoXCJsYXN0UmVzcG9uc2VQZW9wbGVEYXRhXCIsIHJlc3BvbnNlKTtcbiAgICAgICAgY3JlYXRlUGVvcGxlVGFibGUocmVzcG9uc2UucmVzdWx0cyk7XG4gICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICB9KTtcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXByZXYnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjcmVhdGVGZXRjaChpbnRlcm5hbFN0b3JhZ2UuZ2V0KFwibGFzdFJlc3BvbnNlUGVvcGxlRGF0YVwiKS5wcmV2aW91cykoKHJlc3BvbnNlOiBMaXN0UGVvcGxlUmVzcG9uc2VEYXRhKSA9PiB7XG4gICAgICAgIGludGVybmFsU3RvcmFnZS5zZXQoXCJsYXN0UmVzcG9uc2VQZW9wbGVEYXRhXCIsIHJlc3BvbnNlKTtcbiAgICAgICAgY3JlYXRlUGVvcGxlVGFibGUocmVzcG9uc2UucmVzdWx0cyk7XG4gICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICB9KTtcbn0pOyIsIi8qKlxuICrQntC/0YbQuNC+0L3QsNC70YzQvdC+OiDQv9GA0LXQtNGD0YHQvNC+0YLRgNC10YLRjCDQstC+0LfQvNC+0LbQvdC+0YHRgtGMINGB0L7RgNGC0LjRgNC+0LLQutC4INGC0LDQsdC70LjRhtGLXG4gKi9cblxuaW1wb3J0IHtQZXJzb259IGZyb20gXCIuLi9pbnRlcmZhY2VzL1BlcnNvblwiO1xuaW1wb3J0IHtjcmVhdGVQZW9wbGVUYWJsZX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvc3dhcGlDb21wb25lbnRzXCI7XG5pbXBvcnQge2ludGVybmFsU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvaW50ZXJuYWxTdG9yYWdlXCI7XG5cblxubGV0IGlzU29yQXNjOiBib29sZWFuID0gdHJ1ZTsgLy8g0JTQu9GPINC/0LXRgNC10LrQu9GO0YfQtdC90LjQtSDQvNC10LbQtNGDINGB0L7RgNGC0LjRgNC+0LLQutGDINC/0L4g0YPQsdGL0LLQsNC90LjRjiDQuNC70Lgg0L/QviDQstC+0LfRgNCw0YHRgtCw0L3QuNGOXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2wtbmFtZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHNvcnRUeXBlID0gaXNTb3JBc2MgPyAoKGE6IFBlcnNvbiwgYjogUGVyc29uKSA9PiBhLm5hbWUgPiBiLm5hbWUgPyAxIDogLTEpIDogKChhOiBQZXJzb24sIGI6IFBlcnNvbikgPT4gYS5uYW1lIDwgYi5uYW1lID8gMSA6IC0xKTtcbiAgICBpc1NvckFzYyA9ICFpc1NvckFzYztcbiAgICBjcmVhdGVQZW9wbGVUYWJsZShpbnRlcm5hbFN0b3JhZ2UuZ2V0KFwibGFzdFJlc3BvbnNlUGVvcGxlRGF0YVwiKS5yZXN1bHRzLCBzb3J0VHlwZSlcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sLW1hc3MnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBzb3J0VHlwZSA9IGlzU29yQXNjID8gKChhOiBQZXJzb24sIGI6IFBlcnNvbikgPT4ge1xuICAgICAgICBpZiAoYS5tYXNzID09ICd1bmtub3duJykgcmV0dXJuIDE7XG4gICAgICAgIGVsc2UgcmV0dXJuIGEubWFzcyAtIGIubWFzc1xuICAgIH0pIDogKChhOiBQZXJzb24sIGI6IFBlcnNvbikgPT4ge1xuICAgICAgICBpZiAoYi5tYXNzID09ICd1bmtub3duJykgcmV0dXJuIC0xO1xuICAgICAgICBlbHNlIHJldHVybiBiLm1hc3MgLSBhLm1hc3NcbiAgICB9KTtcbiAgICBpc1NvckFzYyA9ICFpc1NvckFzYztcbiAgICBjcmVhdGVQZW9wbGVUYWJsZShpbnRlcm5hbFN0b3JhZ2UuZ2V0KFwibGFzdFJlc3BvbnNlUGVvcGxlRGF0YVwiKS5yZXN1bHRzLCBzb3J0VHlwZSlcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sLWhlaWdodCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IHNvcnRUeXBlID0gaXNTb3JBc2MgPyAoKGE6IFBlcnNvbiwgYjogUGVyc29uKSA9PiBhLmhlaWdodCAtIGIuaGVpZ2h0KSA6ICgoYTogUGVyc29uLCBiOiBQZXJzb24pID0+IGIuaGVpZ2h0IC0gYS5oZWlnaHQpO1xuICAgIGlzU29yQXNjID0gIWlzU29yQXNjO1xuICAgIGNyZWF0ZVBlb3BsZVRhYmxlKGludGVybmFsU3RvcmFnZS5nZXQoXCJsYXN0UmVzcG9uc2VQZW9wbGVEYXRhXCIpLnJlc3VsdHMsIHNvcnRUeXBlKVxufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2wtZ2VuZGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3Qgc29ydFR5cGUgPSBpc1NvckFzYyA/ICgoYTogUGVyc29uLCBiOiBQZXJzb24pID0+IGEuZ2VuZGVyID4gYi5nZW5kZXIgPyAxIDogLTEpIDogKChhOiBQZXJzb24sIGI6IFBlcnNvbikgPT4gYS5nZW5kZXIgPCBiLmdlbmRlciA/IDEgOiAtMSk7XG4gICAgaXNTb3JBc2MgPSAhaXNTb3JBc2M7XG4gICAgY3JlYXRlUGVvcGxlVGFibGUoaW50ZXJuYWxTdG9yYWdlLmdldChcImxhc3RSZXNwb25zZVBlb3BsZURhdGFcIikucmVzdWx0cywgc29ydFR5cGUpXG59KTsiLCJpbXBvcnQge3N3YXBpfSBmcm9tIFwiLi9hcGkvc3dhcGlcIjtcbmltcG9ydCB7Y3JlYXRlUGVvcGxlVGFibGV9IGZyb20gXCIuL2NvbXBvbmVudHMvc3dhcGlDb21wb25lbnRzXCI7XG5pbXBvcnQgJy4vaW50ZXJmYWNlcy9QZXJzb24nXG5pbXBvcnQge2ludGVybmFsU3RvcmFnZX0gZnJvbSBcIi4vc3RvcmFnZS9pbnRlcm5hbFN0b3JhZ2VcIjtcbmltcG9ydCB7TGlzdFBlb3BsZVJlc3BvbnNlRGF0YX0gZnJvbSBcIi4vaW50ZXJmYWNlcy9MaXN0UGVvcGxlUmVzcG9uc2VEYXRhXCI7XG5cblxuaW1wb3J0ICcuL2xpc3RlbmVycy90YWJsZVNvcnRMaXN0ZW5lcnMnIC8vINCU0L7QsdCw0LLQu9C10L3QuNC1IGxpc3RlbmVycyDQtNC70Y8g0YHQvtGA0YLQuNGA0L7QstC60Lgg0YLQsNCx0LvQuNGG0LBcbmltcG9ydCAnLi9saXN0ZW5lcnMvdGFibGVCdXR0b25MaXN0ZW5lcnMnLy8g0JTQvtCx0LDQstC70LXQvdC40LUgbGlzdGVuZXJzINC00LvRjyDQv9C10YDQtdC60LvRjtGH0LXQvdC40LUg0LzQtdC20LTRgyDRgdGC0YDQsNC90LjRhtCw0LzQuFxuXG5cbnN3YXBpLmdldFBlb3BsZSgocmVzcG9uc2U6IExpc3RQZW9wbGVSZXNwb25zZURhdGEpID0+IHtcbiAgICBpbnRlcm5hbFN0b3JhZ2Uuc2V0KCdsYXN0UmVzcG9uc2VQZW9wbGVEYXRhJywgcmVzcG9uc2UpXG4gICAgY3JlYXRlUGVvcGxlVGFibGUocmVzcG9uc2UucmVzdWx0cyk7XG59LCAoZXJyb3I6IGFueSkgPT4ge2NvbnNvbGUuZXJyb3IoZXJyb3IpfSk7XG5cbiIsImV4cG9ydCBjb25zdCBpbnRlcm5hbFN0b3JhZ2UgPSBuZXcgTWFwKCk7IiwiZXhwb3J0IGNvbnN0IGNyZWF0ZUZldGNoID0gKHVybDogc3RyaW5nKSA9PiAgKGNhbGxiYWNrOiBhbnksIGVycm9yQ2FsbGJhY2s6IGFueSkgID0+IHtcbiAgICAgICAgZmV0Y2godXJsKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oY2FsbGJhY2spXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3JDYWxsYmFjaylcbn1cbiJdfQ==
