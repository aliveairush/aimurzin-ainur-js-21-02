import React from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { UserType } from '../../types/dummyApiResponses';
import './UserCard.scss';

const UserCard = (props: UserType) => (
  <ThemeContext.Consumer>
    {(context) => (
      <div className={`user-card ${context.theme}`}>
        <img className="user-card__img" src={props.picture} alt="test" />
        <h5 className="user-card__username">
          {props.title}
          {'. '}
          {props.firstName}
          {' '}
          {props.lastName}
        </h5>
      </div>
    )}
  </ThemeContext.Consumer>
);

export default UserCard;
