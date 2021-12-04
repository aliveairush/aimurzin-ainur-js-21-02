import React, { useEffect, useState } from 'react';
import UserCard from '../../components/userCard/UserCard';
import { UserListResponse, UserType } from '../../types/dummyApiResponses';
import ShowIdHelper from '../../wrappers/ShowIdHelper';
import './UserListForm.scss';
import SectionHeader from '../../components/sectionHeader/SectionHeader';
import SectionFooter from '../../components/sectionFooter/SectionFooter';
import { getUserList } from '../../api/dummyApi';

const UserListForm = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [userList, setUserList] = useState<UserType[]>([]);

  const loadUserList = (newPageNumber: number, loadLimit = limit) => {
    getUserList(newPageNumber, loadLimit, (resp: UserListResponse) => {
      setPage(resp.page);
      setUserList([...resp.data]);
      setTotalElements(resp.total);
      setLimit(resp.limit);
    });
  };

  useEffect(() => {
    loadUserList(page, limit);
  }, []);

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    loadUserList(0, newLimit);
  };

  return (
    <section>
      <SectionHeader changeLimit={changeLimit} />
      <div className="userlist">
        {userList.map((elem) => (
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
      <SectionFooter
        loadUserList={loadUserList}
        currentPage={page}
        limit={limit}
        totalElements={totalElements}
      />
    </section>
  );
};

export default UserListForm;
