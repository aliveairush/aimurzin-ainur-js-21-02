import React from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { UserType } from '../../types/dummyApiResponses';
import './UserCard.scss';

export default class UserCard extends React.Component<UserType, any> {
  render() {
    return (
      <ThemeContext.Consumer>
        {(context) => (
          <div className={`user-card ${context.theme}`}>
            <img className="user-card__img" src={this.props.picture} alt="test" />
            <h5 className="user-card__username">
              {this.props.title}
              {'. '}
              {this.props.firstName}
              {' '}
              {this.props.lastName}
            </h5>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
