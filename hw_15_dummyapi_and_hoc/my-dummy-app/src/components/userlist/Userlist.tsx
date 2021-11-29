import React from 'react';
import UserCard from '../userCard/UserCard';

export default class Userlist extends React.Component<any, any> {
  render() {
    return (
      <div className="userlist">
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    );
  }
}
