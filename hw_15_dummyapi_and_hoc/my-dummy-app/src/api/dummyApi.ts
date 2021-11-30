import {
  APP_ID_FIELD, APP_ID_VALUE, USER_URL,
} from '../constants/dummyApi';
import { METHOD_GET } from '../constants/common';
import { UserListResponse } from '../types/dummyApiResponses';

export const getUserList = (
  page: number,
  limit: number,
  callback: (resp: UserListResponse) => void,
  errorCallback?: (resp: any) => void,
) => fetch(`${USER_URL}?limit=${limit}&page=${page}`, {
  method: METHOD_GET,
  headers: new Headers({
    [APP_ID_FIELD]: APP_ID_VALUE,
  }),
}).then((response) => response.json())
  .then((response: UserListResponse) => {
    console.log(response);
    callback(response);
  })
  .catch(errorCallback);
