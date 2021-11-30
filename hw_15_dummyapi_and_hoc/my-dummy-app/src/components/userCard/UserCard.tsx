import React from 'react';
import { UserType } from '../../types/dummyApiResponses';

export default class UserCard extends React.Component<UserType, any> {
  render() {
    return (
      <div className="user-card">
        <img className="user-card__img" src={this.props.picture} alt="test" />
        <h5 className="user-card__username">
          {this.props.title}
          {'. '}
          {this.props.firstName}
          {' '}
          {this.props.lastName}
        </h5>
      </div>
    );
  }
}
