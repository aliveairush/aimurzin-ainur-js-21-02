import React from 'react';
import { IThemeContext, ThemeContext } from '../../contexts/ThemeContext';
import './ThemeToggle.scss';

const ThemeToggle = () => (
  <ThemeContext.Consumer>
    {(context: IThemeContext) => (
      <div className="theme-toggle">
        <label htmlFor="toggle">
          Тёмная тема
          <input
            type="checkbox"
            checked={context.theme === 'dark'}
            id="toggle"
            name="toggle"
            onChange={context.toggleTheme}
          />
        </label>
      </div>
    )}
  </ThemeContext.Consumer>
);

export default ThemeToggle;
