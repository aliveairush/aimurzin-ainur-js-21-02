import {
  APP_ID_FIELD, APP_ID_VALUE, BASE_URL, LIMIT_PARAM, PAGE_PARAM, USER_URL,
} from '../constants/dummyApi';
import { METHOD_GET, METHOD_POST } from '../constants/common';
import {
  IUserRegistrationFormType, ResponseError, UserListResponse, UserProfileType,
} from '../types/dummyApiResponses';

const doGetRequest = <T>(
  path: string,
  callback: (resp: T) => void,
  errorCallback?: (resp: ResponseError) => void,
  finalCallback?: () => void,
  searchParams?: Record<string, any>,
) => {
  const url = new URL(path, BASE_URL);
  searchParams && Object.entries(searchParams).forEach((params) => {
    url.searchParams.append(params[0], params[1].toString());
  });
  fetch(url.toString(), {
    method: METHOD_GET,
    headers: new Headers({
      [APP_ID_FIELD]: APP_ID_VALUE,
    }),
  }).then((resp) => resp.json())
    .then(callback)
    .catch(errorCallback)
    .finally(finalCallback);
};

export const getUserList = (
  page: number,
  limit: number,
  callback: (resp: UserListResponse) => void,
  errorCallback?: (resp: any) => void,
  finalCallback?: () => void,
) => {
  doGetRequest(USER_URL, callback, errorCallback, finalCallback, { [LIMIT_PARAM]: limit, [PAGE_PARAM]: page });
};

export const getUserById = (
  id: string,
  callback: (resp: any) => void,
  errorCallback?: (resp: ResponseError) => void,
  finalCallback?: () => void,
) => {
  doGetRequest(`${USER_URL}/${id}`, callback, errorCallback, finalCallback);
};

export const postCreateUser = (
  userForm: IUserRegistrationFormType,
  callback: (resp: UserProfileType) => void,
  errorCallback?: (resp: ResponseError) => void,
  finalCallback?: () => void,
) => {
  fetch(`${BASE_URL}/user/create`, {
    method: METHOD_POST,
    headers: new Headers({
      [APP_ID_FIELD]: APP_ID_VALUE,
      'Content-Type': 'application/json;charset=utf-8',
    }),
    body: JSON.stringify(userForm),
  }).then((resp) => {
    if (resp.ok) return resp.json();
    throw new Error('Произошла какая то ошибка :(');
  })
    .then(callback)
    .catch(errorCallback)
    .finally(finalCallback);
};
