export interface ListResponseType<T> {
  data: Array<T>;
  total: number;
  page: number;
  limit: number;
}

export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
  title: string
}

export interface UserListResponse extends ListResponseType<UserType> {}

export interface UserProfileType {
  id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  dateOfBirth?: string;
  registerDate?: string;
  phone?: string;
  picture?: string;
}

export interface ResponseError {
  error: string;
}
