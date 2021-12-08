import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useParams } from 'react-router-dom';
import { UserProfileType } from '../../types/dummyApiResponses';
import useScrollToTop from '../../hooks/useScrollToTop';
import './UserForm.scss';
import { loadUserProfileAction } from '../../actions/loadUserProfileActions';
import { IUserProfileStore } from '../../types/state';

interface Params {
  id: string,
}

interface Props {
  user: UserProfileType,
  loading: boolean,
  loadUser: (userId: string) => void,
}
const UserForm = ({ user, loading, loadUser } : Props) => {
  useScrollToTop();
  const { id } = useParams() as Params;

  useEffect(() => {
    loadUser(id);
  }, []);

  return (
    loading ? <div>Идет загрузка</div> : (
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
    )

  );
};

const mapStateToProps = (state: IUserProfileStore) => ({
  user: state.userProfileState.user,
  loading: state.userProfileState.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadUser: bindActionCreators(loadUserProfileAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
