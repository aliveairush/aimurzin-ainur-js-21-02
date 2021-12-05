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
        if (a.mass == 'unknown')
            return 1;
        else
            return a.mass - b.mass;
    }) : (function (a, b) {
        if (b.mass == 'unknown')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBpL3N3YXBpLnRzIiwic3JjL2NvbXBvbmVudHMvc3dhcGlDb21wb25lbnRzLnRzIiwic3JjL2NvbnN0YW5zL3N3YXBpLnRzIiwic3JjL2xpc3RlbmVycy90YWJsZUJ1dHRvbkxpc3RlbmVycy50cyIsInNyYy9saXN0ZW5lcnMvdGFibGVTb3J0TGlzdGVuZXJzLnRzIiwic3JjL21haW4udHMiLCJzcmMvc3RvcmFnZS9pbnRlcm5hbFN0b3JhZ2UudHMiLCJzcmMvdXRpbHMvZmV0Y2hVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0FBLGtEQUFnRDtBQUNoRCwyQ0FBdUQ7QUFFMUMsUUFBQSxLQUFLLEdBQUc7SUFDakIsT0FBTyxFQUFFLElBQUEsd0JBQVcsRUFBQyxnQkFBUSxDQUFDO0lBQzlCLFNBQVMsRUFBRSxJQUFBLHdCQUFXLEVBQUMsa0JBQVUsQ0FBQztDQUNyQyxDQUFBOzs7OztBQ0hNLElBQU0sb0JBQW9CLEdBQUcsVUFBQyxJQUFZLEVBQUUsTUFBYyxFQUFFLElBQVksRUFBRSxNQUFjO0lBQzNGLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0MsUUFBUSxDQUFDLFNBQVMsR0FBRyxTQUFPLElBQUksaUJBQVksTUFBTSxpQkFBWSxJQUFJLGlCQUFZLE1BQU0sVUFBTyxDQUFDO0lBRTVGLE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUMsQ0FBQTtBQUxZLFFBQUEsb0JBQW9CLHdCQUtoQztBQUdNLElBQU0saUJBQWlCLEdBQUcsVUFBQyxXQUF1QixFQUFFLElBQXVDO0lBQzlGLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEYsS0FBSyxDQUFDLFNBQVMsR0FBRyxF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S0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7Ozs7O0FDZDlCLFFBQUEsZUFBZSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7Ozs7O0FDQWxDLElBQU0sV0FBVyxHQUFHLFVBQUMsR0FBVyxJQUFNLE9BQUEsVUFBQyxRQUFhLEVBQUUsYUFBa0I7SUFDdkUsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNMLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7U0FDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNkLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUNqQyxDQUFDLEVBTDRDLENBSzVDLENBQUE7QUFMWSxRQUFBLFdBQVcsZUFLdkIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQge2NyZWF0ZUZldGNofSBmcm9tIFwiLi4vdXRpbHMvZmV0Y2hVdGlsc1wiO1xyXG5pbXBvcnQge01BSU5fVVJMLCBQRU9QTEVfVVJMfSBmcm9tIFwiLi4vY29uc3RhbnMvc3dhcGlcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBzd2FwaSA9IHtcclxuICAgIGdldE1haW46IGNyZWF0ZUZldGNoKE1BSU5fVVJMKSxcclxuICAgIGdldFBlb3BsZTogY3JlYXRlRmV0Y2goUEVPUExFX1VSTCksXHJcbn0iLCJpbXBvcnQge1BlcnNvbn0gZnJvbSBcIi4uL2ludGVyZmFjZXMvUGVyc29uXCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBlcnNvblRhYmxlUm93ID0gKG5hbWU6IHN0cmluZywgaGVpZ2h0OiBudW1iZXIsIG1hc3M6IG51bWJlciwgZ2VuZGVyOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHRhYmxlUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxyXG4gICAgdGFibGVSb3cuaW5uZXJIVE1MID0gYDx0ZD4ke25hbWV9PC90ZD48dGQ+JHtoZWlnaHR9PC90ZD48dGQ+JHttYXNzfTwvdGQ+PHRkPiR7Z2VuZGVyfTwvdGQ+YDtcclxuXHJcbiAgICByZXR1cm4gdGFibGVSb3c7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlUGVvcGxlVGFibGUgPSAocGVvcGxlQXJyYXk6IEFycmF5PGFueT4sIHNvcnQ/OiAoYTogUGVyc29uLCBiOiBQZXJzb24pID0+IG51bWJlcikgPT4ge1xyXG4gICAgY29uc3QgdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhYmxlXCIpLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGJvZHlcIilbMF07XHJcbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcclxuXHJcblxyXG4gICAgaWYgKHR5cGVvZiBzb3J0ICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgcGVvcGxlQXJyYXkuc29ydChzb3J0KTtcclxuICAgIH1cclxuICAgIHBlb3BsZUFycmF5LmZvckVhY2gocGVyc29uID0+IHtcclxuICAgICAgICB0Ym9keS5hcHBlbmQoY3JlYXRlUGVyc29uVGFibGVSb3cocGVyc29uLm5hbWUsIHBlcnNvbi5oZWlnaHQsIHBlcnNvbi5tYXNzLCBwZXJzb24uZ2VuZGVyKSlcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRib2R5O1xyXG59XHJcbiIsImV4cG9ydCBjb25zdCBNQUlOX1VSTDogc3RyaW5nID0gJ2h0dHBzOi8vc3dhcGkuZGV2L2FwaS8nXHJcbmV4cG9ydCBjb25zdCBQRU9QTEVfVVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8nIiwiaW1wb3J0IHtjcmVhdGVGZXRjaH0gZnJvbSBcIi4uL3V0aWxzL2ZldGNoVXRpbHNcIjtcclxuaW1wb3J0IHtpbnRlcm5hbFN0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL2ludGVybmFsU3RvcmFnZVwiO1xyXG5pbXBvcnQge2NyZWF0ZVBlb3BsZVRhYmxlfSBmcm9tIFwiLi4vY29tcG9uZW50cy9zd2FwaUNvbXBvbmVudHNcIjtcclxuaW1wb3J0IHtMaXN0UGVvcGxlUmVzcG9uc2VEYXRhfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9MaXN0UGVvcGxlUmVzcG9uc2VEYXRhXCI7XHJcblxyXG4vKipcclxuICogKtCe0L/RhtC40L7QvdCw0LvRjNC90L46INC/0YDQtdC00YPRgdC80L7RgtGA0LXRgtGMINCy0L7Qt9C80L7QttC90L7RgdGC0Ywg0L/QtdGA0LXRhdC+0LTQsCDQuiDRgdC70LXQtNGD0Y7RidC10Lkg0YHRgtGA0LDQvdC40YbQtSAo0YHRgdGL0LvQutCwINGB0L7QtNC10YDQttC40YLRgdGPINCyINC+0LHRitC10LrRgtC1IEFQSSDQsiDRgdCy0L7QudGB0YLQstC1IFwibmV4dFwiKVxyXG4gKiDQuCDQv9GA0LXQtNGL0LTRg9GJ0LXQuSDRgdGC0YDQsNC90LjRhtC1ICjRgdGB0YvQu9C60LAg0YHQvtC00LXRgNC20LjRgtGB0Y8g0LIg0L7QsdGK0LXQutGC0LUgQVBJINCyINGB0LLQvtC50YHRgtCy0LUgXCJwcmV2aW91c1wiKVxyXG4gKi9cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1uZXh0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjcmVhdGVGZXRjaChpbnRlcm5hbFN0b3JhZ2UuZ2V0KFwibGFzdFJlc3BvbnNlUGVvcGxlRGF0YVwiKS5uZXh0KSgocmVzcG9uc2U6IExpc3RQZW9wbGVSZXNwb25zZURhdGEpID0+IHtcclxuICAgICAgICBpbnRlcm5hbFN0b3JhZ2Uuc2V0KFwibGFzdFJlc3BvbnNlUGVvcGxlRGF0YVwiLCByZXNwb25zZSk7XHJcbiAgICAgICAgY3JlYXRlUGVvcGxlVGFibGUocmVzcG9uc2UucmVzdWx0cyk7XHJcbiAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXByZXYnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNyZWF0ZUZldGNoKGludGVybmFsU3RvcmFnZS5nZXQoXCJsYXN0UmVzcG9uc2VQZW9wbGVEYXRhXCIpLnByZXZpb3VzKSgocmVzcG9uc2U6IExpc3RQZW9wbGVSZXNwb25zZURhdGEpID0+IHtcclxuICAgICAgICBpbnRlcm5hbFN0b3JhZ2Uuc2V0KFwibGFzdFJlc3BvbnNlUGVvcGxlRGF0YVwiLCByZXNwb25zZSk7XHJcbiAgICAgICAgY3JlYXRlUGVvcGxlVGFibGUocmVzcG9uc2UucmVzdWx0cyk7XHJcbiAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcbiAgICB9KTtcclxufSk7IiwiLyoqXHJcbiAq0J7Qv9GG0LjQvtC90LDQu9GM0L3Qvjog0L/RgNC10LTRg9GB0LzQvtGC0YDQtdGC0Ywg0LLQvtC30LzQvtC20L3QvtGB0YLRjCDRgdC+0YDRgtC40YDQvtCy0LrQuCDRgtCw0LHQu9C40YbRi1xyXG4gKi9cclxuXHJcbmltcG9ydCB7UGVyc29ufSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9QZXJzb25cIjtcclxuaW1wb3J0IHtjcmVhdGVQZW9wbGVUYWJsZX0gZnJvbSBcIi4uL2NvbXBvbmVudHMvc3dhcGlDb21wb25lbnRzXCI7XHJcbmltcG9ydCB7aW50ZXJuYWxTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9pbnRlcm5hbFN0b3JhZ2VcIjtcclxuXHJcblxyXG5sZXQgaXNTb3JBc2M6IGJvb2xlYW4gPSB0cnVlOyAvLyDQlNC70Y8g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNC1INC80LXQttC00YMg0YHQvtGA0YLQuNGA0L7QstC60YMg0L/QviDRg9Cx0YvQstCw0L3QuNGOINC40LvQuCDQv9C+INCy0L7Qt9GA0LDRgdGC0LDQvdC40Y5cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2wtbmFtZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY29uc3Qgc29ydFR5cGUgPSBpc1NvckFzYyA/ICgoYTogUGVyc29uLCBiOiBQZXJzb24pID0+IGEubmFtZSA+IGIubmFtZSA/IDEgOiAtMSkgOiAoKGE6IFBlcnNvbiwgYjogUGVyc29uKSA9PiBhLm5hbWUgPCBiLm5hbWUgPyAxIDogLTEpO1xyXG4gICAgaXNTb3JBc2MgPSAhaXNTb3JBc2M7XHJcbiAgICBjcmVhdGVQZW9wbGVUYWJsZShpbnRlcm5hbFN0b3JhZ2UuZ2V0KFwibGFzdFJlc3BvbnNlUGVvcGxlRGF0YVwiKS5yZXN1bHRzLCBzb3J0VHlwZSlcclxufSk7XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sLW1hc3MnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNvbnN0IHNvcnRUeXBlID0gaXNTb3JBc2MgPyAoKGE6IFBlcnNvbiwgYjogUGVyc29uKSA9PiB7XHJcbiAgICAgICAgaWYgKGEubWFzcyA9PSAndW5rbm93bicpIHJldHVybiAxO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGEubWFzcyAtIGIubWFzc1xyXG4gICAgfSkgOiAoKGE6IFBlcnNvbiwgYjogUGVyc29uKSA9PiB7XHJcbiAgICAgICAgaWYgKGIubWFzcyA9PSAndW5rbm93bicpIHJldHVybiAtMTtcclxuICAgICAgICBlbHNlIHJldHVybiBiLm1hc3MgLSBhLm1hc3NcclxuICAgIH0pO1xyXG4gICAgaXNTb3JBc2MgPSAhaXNTb3JBc2M7XHJcbiAgICBjcmVhdGVQZW9wbGVUYWJsZShpbnRlcm5hbFN0b3JhZ2UuZ2V0KFwibGFzdFJlc3BvbnNlUGVvcGxlRGF0YVwiKS5yZXN1bHRzLCBzb3J0VHlwZSlcclxufSk7XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sLWhlaWdodCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY29uc3Qgc29ydFR5cGUgPSBpc1NvckFzYyA/ICgoYTogUGVyc29uLCBiOiBQZXJzb24pID0+IGEuaGVpZ2h0IC0gYi5oZWlnaHQpIDogKChhOiBQZXJzb24sIGI6IFBlcnNvbikgPT4gYi5oZWlnaHQgLSBhLmhlaWdodCk7XHJcbiAgICBpc1NvckFzYyA9ICFpc1NvckFzYztcclxuICAgIGNyZWF0ZVBlb3BsZVRhYmxlKGludGVybmFsU3RvcmFnZS5nZXQoXCJsYXN0UmVzcG9uc2VQZW9wbGVEYXRhXCIpLnJlc3VsdHMsIHNvcnRUeXBlKVxyXG59KTtcclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2wtZ2VuZGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjb25zdCBzb3J0VHlwZSA9IGlzU29yQXNjID8gKChhOiBQZXJzb24sIGI6IFBlcnNvbikgPT4gYS5nZW5kZXIgPiBiLmdlbmRlciA/IDEgOiAtMSkgOiAoKGE6IFBlcnNvbiwgYjogUGVyc29uKSA9PiBhLmdlbmRlciA8IGIuZ2VuZGVyID8gMSA6IC0xKTtcclxuICAgIGlzU29yQXNjID0gIWlzU29yQXNjO1xyXG4gICAgY3JlYXRlUGVvcGxlVGFibGUoaW50ZXJuYWxTdG9yYWdlLmdldChcImxhc3RSZXNwb25zZVBlb3BsZURhdGFcIikucmVzdWx0cywgc29ydFR5cGUpXHJcbn0pOyIsImltcG9ydCB7c3dhcGl9IGZyb20gXCIuL2FwaS9zd2FwaVwiO1xyXG5pbXBvcnQge2NyZWF0ZVBlb3BsZVRhYmxlfSBmcm9tIFwiLi9jb21wb25lbnRzL3N3YXBpQ29tcG9uZW50c1wiO1xyXG5pbXBvcnQgJy4vaW50ZXJmYWNlcy9QZXJzb24nXHJcbmltcG9ydCB7aW50ZXJuYWxTdG9yYWdlfSBmcm9tIFwiLi9zdG9yYWdlL2ludGVybmFsU3RvcmFnZVwiO1xyXG5pbXBvcnQge0xpc3RQZW9wbGVSZXNwb25zZURhdGF9IGZyb20gXCIuL2ludGVyZmFjZXMvTGlzdFBlb3BsZVJlc3BvbnNlRGF0YVwiO1xyXG5cclxuXHJcbmltcG9ydCAnLi9saXN0ZW5lcnMvdGFibGVTb3J0TGlzdGVuZXJzJyAvLyDQlNC+0LHQsNCy0LvQtdC90LjQtSBsaXN0ZW5lcnMg0LTQu9GPINGB0L7RgNGC0LjRgNC+0LLQutC4INGC0LDQsdC70LjRhtCwXHJcbmltcG9ydCAnLi9saXN0ZW5lcnMvdGFibGVCdXR0b25MaXN0ZW5lcnMnLy8g0JTQvtCx0LDQstC70LXQvdC40LUgbGlzdGVuZXJzINC00LvRjyDQv9C10YDQtdC60LvRjtGH0LXQvdC40LUg0LzQtdC20LTRgyDRgdGC0YDQsNC90LjRhtCw0LzQuFxyXG5cclxuXHJcbnN3YXBpLmdldFBlb3BsZSgocmVzcG9uc2U6IExpc3RQZW9wbGVSZXNwb25zZURhdGEpID0+IHtcclxuICAgIGludGVybmFsU3RvcmFnZS5zZXQoJ2xhc3RSZXNwb25zZVBlb3BsZURhdGEnLCByZXNwb25zZSlcclxuICAgIGNyZWF0ZVBlb3BsZVRhYmxlKHJlc3BvbnNlLnJlc3VsdHMpO1xyXG59LCAoZXJyb3I6IGFueSkgPT4ge2NvbnNvbGUuZXJyb3IoZXJyb3IpfSk7XHJcblxyXG4iLCJleHBvcnQgY29uc3QgaW50ZXJuYWxTdG9yYWdlID0gbmV3IE1hcCgpOyIsImV4cG9ydCBjb25zdCBjcmVhdGVGZXRjaCA9ICh1cmw6IHN0cmluZykgPT4gIChjYWxsYmFjazogYW55LCBlcnJvckNhbGxiYWNrOiBhbnkpICA9PiB7XHJcbiAgICAgICAgZmV0Y2godXJsKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3JDYWxsYmFjaylcclxufVxyXG4iXX0=
