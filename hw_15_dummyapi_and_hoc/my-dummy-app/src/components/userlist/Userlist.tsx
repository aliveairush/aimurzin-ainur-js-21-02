import React from 'react';
import UserCard from '../userCard/UserCard';
import { UserType } from '../../types/dummyApiResponses';
import ShowIdHelper from '../../wrappers/ShowIdHelper';
import './Userlist.scss';

interface IProps {
  userList: Array<UserType>;
}

export default class Userlist extends React.Component<IProps, any> {
  render() {
    return (
      <div className="userlist">
        {this.props.userList.map((elem) => (
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
  }
}
