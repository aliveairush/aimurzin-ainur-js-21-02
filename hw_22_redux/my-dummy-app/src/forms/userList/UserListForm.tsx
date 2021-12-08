import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import UserCard from '../../components/userCard/UserCard';
import { UserType } from '../../types/dummyApiResponses';
import ShowIdHelper from '../../wrappers/ShowIdHelper';
import './UserListForm.scss';
import SectionHeader from '../../components/sectionHeader/SectionHeader';
import SectionFooter from '../../components/sectionFooter/SectionFooter';
import { State } from '../../types/state';
import { loadUserListAction } from '../../actions/userListActions';

interface Props {
  userList: Array<UserType>,
  page: number,
  limit: number,
  totalElements: number,
  loadUserList: (page: number, limit: number) => void,
}

const UserListForm = ({
  userList, page, limit, totalElements, loadUserList,
}: Props) => {
  useEffect(() => {
    console.log('VIEW: ComponenntDidMount');
    loadUserList(page, limit);
  }, []);

  const changeLimit = (newLimit: number) => {
    // setLimit(newLimit);
    loadUserList(0, newLimit);
  };

  return (
    <section>
      <SectionHeader changeLimit={changeLimit} />
      <div className="userlist">
        {userList && userList.map((elem) => (
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
        loadUserList={loadUserList}
        currentPage={page}
        limit={limit}
        totalElements={totalElements}
      />
    </section>
  );
};

const mapStateToProps = (state: State) => ({
  userList: state.userListState.userList,
  page: state.userListState.page,
  limit: state.userListState.limit,
  totalElements: state.userListState.total,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({ loadUserList: bindActionCreators(loadUserListAction, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(UserListForm);
