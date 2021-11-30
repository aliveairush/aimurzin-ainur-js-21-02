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
