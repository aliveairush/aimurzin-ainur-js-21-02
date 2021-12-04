import React from 'react';
import './App.scss';
import {
  BrowserRouter, Link, Route, Routes,
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import UserListForm from './forms/userList/UserListForm';
import ThemeContextProvider, { ThemeContext } from './contexts/ThemeContext';
import EmptyForm from './forms/empty/EmptyForm';
import UserForm from './forms/userProfile/UserForm';
import 'antd/dist/antd.css';
import RegistrationForm from './forms/registration/RegistrationForm';

const renderPageHeader = () => (
  <Header>
    <Menu mode="horizontal" theme="dark">
      <Menu.Item>
        <Link to="/user">Пользователи</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/registration">Регистрация</Link>
      </Menu.Item>
    </Menu>
  </Header>
);

const App = () => (
  <BrowserRouter>
    <ThemeContextProvider>
      <ThemeContext.Consumer>
        {(context) => (
          <div className={`App ${context.theme}`}>
            <Layout className="custom-container">
              {renderPageHeader()}
              <Content>
                <Routes>
                  <Route path="/empty" element={<EmptyForm />} />
                  <Route path="/registration" element={<RegistrationForm />} />
                  <Route path="/user/:id" element={<UserForm />} />
                  <Route path="/user" element={<UserListForm />} />
                  <Route path="/" element={<UserListForm />} />
                </Routes>
              </Content>
            </Layout>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContextProvider>
  </BrowserRouter>

);

export default App;
