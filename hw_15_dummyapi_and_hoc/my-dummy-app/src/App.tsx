import React, { useState } from 'react';
import './App.scss';
import SectionHeader from './components/sectionHeader/SectionHeader';
import Userlist from './components/userlist/Userlist';
import SectionFooter from './components/sectionFooter/SectionFooter';
import ThemeContextProvider, { ThemeContext } from './contexts/ThemeContext';
import { UserListResponse, UserType } from './types/dummyApiResponses';
import { getUserList } from './api/dummyApi';

const App = () => {
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

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    loadUserList(0, newLimit);
  };

  return (
    <ThemeContextProvider>
      <ThemeContext.Consumer>
        {(context) => (
          <div className={`App ${context.theme}`}>
            <section className="page-layout">
              <SectionHeader changeLimit={changeLimit} />
              <Userlist userList={userList} />
              <SectionFooter
                loadUserList={loadUserList}
                currentPage={page}
                limit={limit}
                totalElements={totalElements}
              />
            </section>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContextProvider>
  );
};

export default App;
