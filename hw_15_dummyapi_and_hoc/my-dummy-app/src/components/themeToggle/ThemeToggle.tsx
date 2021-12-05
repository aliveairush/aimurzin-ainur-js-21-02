import React from 'react';
import { IThemeContext, ThemeContext } from '../../contexts/ThemeContext';
import './ThemeToggle.scss';

export default class ThemeToggle extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(context: IThemeContext) => (
          <div className="theme-toggle">
            <label htmlFor="toggle">
              Тёмная тема
              <input type="checkbox" id="toggle" name="toggle" onChange={context.toggleTheme} />
            </label>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
