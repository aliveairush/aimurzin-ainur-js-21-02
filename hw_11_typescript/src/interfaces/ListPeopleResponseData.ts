import {Person} from "./Person";

export interface ListPeopleResponseData {
    count: number;
    next: string;
    previous: string;
    results: Array<Person>
}