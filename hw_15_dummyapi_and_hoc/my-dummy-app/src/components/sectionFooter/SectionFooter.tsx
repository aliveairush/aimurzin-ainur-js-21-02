import React from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export default class SectionFooter extends React.Component<any, any> {
  render() {
    return (
      <ThemeContext.Consumer>
        {(context) => (
          <div className="section-footer">
            <div className="pagination">
              <button type="button">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">4</button>
              <button type="button">5</button>
            </div>
            <div className="theme-toggle">
              <label htmlFor="toggle">
                Тёмная тема
                {' '}
                {context.theme}
                <input type="checkbox" id="toggle" name="toggle" onChange={context.toggleTheme} />
              </label>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
