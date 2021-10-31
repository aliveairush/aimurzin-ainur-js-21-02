import {createFetch} from "../utils/fetchUtils";
import {internalStorage} from "../storage/internalStorage";
import {createPeopleTable} from "../components/swapiComponents";
import {ListPeopleResponseData} from "../interfaces/ListPeopleResponseData";

/**
 * *Опционально: предусмотреть возможность перехода к следующей странице (ссылка содержится в объекте API в свойстве "next")
 * и предыдущей странице (ссылка содержится в объекте API в свойстве "previous")
 */
document.getElementById('btn-next').addEventListener('click', () => {
    createFetch(internalStorage.get("lastResponsePeopleData").next)((response: ListPeopleResponseData) => {
        internalStorage.set("lastResponsePeopleData", response);
        createPeopleTable(response.results);
    }, (error: any) => {
        console.error(error)
    });
});

document.getElementById('btn-prev').addEventListener('click', () => {
    createFetch(internalStorage.get("lastResponsePeopleData").previous)((response: ListPeopleResponseData) => {
        internalStorage.set("lastResponsePeopleData", response);
        createPeopleTable(response.results);
    }, (error: any) => {
        console.error(error)
    });
});