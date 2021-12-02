import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserListForm from './forms/userList/UserListForm';
import ThemeContextProvider, { ThemeContext } from './contexts/ThemeContext';
import UserForm from './forms/userProfile/UserForm';

const App = () => (
  <BrowserRouter>
    <ThemeContextProvider>
      <ThemeContext.Consumer>
        {(context) => (
          <div className={`App ${context.theme}`}>
            <Routes>
              <Route path="/user" element={<UserForm />} />
              <Route path="/" element={<UserListForm />} />
            </Routes>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContextProvider>
  </BrowserRouter>

);

export default App;
