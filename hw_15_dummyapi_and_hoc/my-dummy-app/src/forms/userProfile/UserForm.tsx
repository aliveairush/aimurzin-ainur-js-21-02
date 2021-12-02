import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ResponseError, UserProfileType } from '../../types/dummyApiResponses';
import { getUserById } from '../../api/dummyApi';
import useScrollToTop from '../../hooks/useScrollToTop';
import './UserForm.scss';

interface Params {
  id: string
}
const UserForm = () => {
  useScrollToTop();
  const { id } = useParams() as Params;
  const [user, setUser] = useState({} as UserProfileType);

  useEffect(() => {
    getUserById(id, setUser, ({ error }: ResponseError) => alert(error), () => {});
  }, []);

  return (
    <div className="containter">
      <div className="user-profile-info">
        <div className="user-profile-info__image">
          <img src={user.picture} alt={user.firstName} />
        </div>
        <div className="user-profile-info__name">
          <span>{`${user.lastName} ${user.firstName}`}</span>
        </div>
        <div className="user-profile-info__other">
          <h3>Additional info:</h3>
          <p>
            <strong>Email:&nbsp;</strong>
            {user.email}
          </p>
          <p>
            <strong>Phone:&nbsp;</strong>
            {user.phone}
          </p>
          <p>
            <strong>Date of birth:&nbsp;</strong>
            {user.dateOfBirth}
          </p>
          <p>
            <strong>Register date:&nbsp;</strong>
            {user.registerDate}
          </p>
          <p>
            <strong>Gender:&nbsp;</strong>
            {user.gender}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
