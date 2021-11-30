import React from 'react';
import './App.scss';
import SectionHeader from './components/sectionHeader/SectionHeader';
import Userlist from './components/userlist/Userlist';
import SectionFooter from './components/sectionFooter/SectionFooter';
import ThemeContextProvider, { ThemeContext } from './contexts/ThemeContext';
import { UserListResponse, UserType } from './types/dummyApiResponses';
import { getUserList } from './api/dummyApi';

interface IState {
  userList: Array<UserType>;
  page: number;
  totalElements: number,
  limit: number
}

const initialState = {
  userList: [],
  page: 0,
  totalElements: 0,
  limit: 10,
};

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = initialState;
    this.loadUserList = this.loadUserList.bind(this);
  }

  componentDidMount(): void {
    this.loadUserList(this.state.page);
  }

  loadUserList(page: number) {
    console.log(this.state.limit);
    getUserList(page, this.state.limit, (resp: UserListResponse) => {
      console.log(resp);
      this.setState({
        userList: resp.data, page: resp.page, totalElements: resp.total, limit: resp.limit,
      });
    });
  }

  render() {
    return (
      <ThemeContextProvider>
        <ThemeContext.Consumer>
          {(context) => (
            <div className={`App ${context.theme}`}>
              <section className="page-layout">
                <SectionHeader />
                <Userlist userList={this.state.userList} />
                <SectionFooter
                  loadUserList={this.loadUserList}
                  currentPage={this.state.page}
                  limit={this.state.limit}
                  totalElements={this.state.totalElements}
                />
              </section>
            </div>
          )}

        </ThemeContext.Consumer>
      </ThemeContextProvider>

    );
  }
}

export default App;
