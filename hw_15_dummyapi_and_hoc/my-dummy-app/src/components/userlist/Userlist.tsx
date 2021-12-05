import React from 'react';
import UserCard from '../userCard/UserCard';
import { UserType } from '../../types/dummyApiResponses';
import ShowIdHelper from '../../wrappers/ShowIdHelper';
import './Userlist.scss';

interface IProps {
  userList: Array<UserType>;
}

const Userlist = (props: IProps) => (
  <div className="userlist">
    {props.userList.map((elem) => (
      <ShowIdHelper id={elem.id}>
        <UserCard
          id={elem.id}
          title={elem.title}
          picture={elem.picture}
          firstName={elem.firstName}
          lastName={elem.lastName}
        />
      </ShowIdHelper>
    ))}
  </div>
);

export default Userlist;
