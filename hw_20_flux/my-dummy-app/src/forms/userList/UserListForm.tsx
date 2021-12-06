import React, { useEffect, useState } from 'react';
import UserCard from '../../components/userCard/UserCard';
import ShowIdHelper from '../../wrappers/ShowIdHelper';
import './UserListForm.scss';
import SectionHeader from '../../components/sectionHeader/SectionHeader';
import SectionFooter from '../../components/sectionFooter/SectionFooter';
import appStore from '../../store/userListStore';
import { changeContentLimitAction, loadUserListAction } from '../../actions/loadUserListAction';
import { UserListState } from '../../types/state';

const UserListForm = () => {
  const [state, setState] = useState({
    page: 0,
    limit: 10,
    total: 1,
    userList: [],
  } as UserListState);

  useEffect(() => {
    setState(appStore.getState);
    appStore.on('change', () => setState(appStore.getState()));
    loadUserListAction(state.page, state.limit);
  }, []);

  return (
    <section>
      <SectionHeader changeLimit={changeContentLimitAction} />
      <div className="userlist">
        {state.userList.map((elem) => (
          <ShowIdHelper id={elem.id} key={elem.id}>
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
      <SectionFooter
        loadUserList={loadUserListAction}
        currentPage={state.page}
        limit={state.limit}
        totalElements={state.total}
      />
    </section>
  );
};

export default UserListForm;
