import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { UserType } from '../../types/dummyApiResponses';
import './UserCard.scss';

const UserCard = (props: UserType) => (
  <ThemeContext.Consumer>
    {(context) => (
      <Link to={`/user/${props.id}`}>
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

      </Link>
    )}
  </ThemeContext.Consumer>
);

export default UserCard;
