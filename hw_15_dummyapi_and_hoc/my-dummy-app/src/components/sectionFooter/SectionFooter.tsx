import React from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import PaginationButton from './paginationButton/PaginationButton';

interface IProps {
  currentPage: number,
  totalElements: number,
  limit: number,
  loadUserList: (page: number) => void
}

export default class SectionFooter extends React.Component<IProps, any> {
  render() {
    const { currentPage } = this.props;
    const { totalElements } = this.props;
    const { limit } = this.props;
    return (
      <ThemeContext.Consumer>
        {(context) => (
          <div className="section-footer">
            <div className="pagination">
              { currentPage - 3 > 0 && totalElements / limit - currentPage < 2 && <PaginationButton pageNumber={currentPage - 4} key={currentPage - 4} loadUserList={this.props.loadUserList} />}
              { currentPage - 2 > 0 && totalElements / limit - currentPage < 1 && <PaginationButton pageNumber={currentPage - 3} key={currentPage - 3} loadUserList={this.props.loadUserList} />}
              { currentPage - 1 > 0 && <PaginationButton pageNumber={currentPage - 2} key={currentPage - 2} loadUserList={this.props.loadUserList} />}
              { currentPage > 0 && <PaginationButton pageNumber={currentPage - 1} key={currentPage - 1} loadUserList={this.props.loadUserList} />}
              <PaginationButton pageNumber={currentPage} key={currentPage} active />
              { currentPage + 1 > 0 && currentPage + 1 < totalElements / limit && <PaginationButton pageNumber={currentPage + 1} key={currentPage + 1} loadUserList={this.props.loadUserList} />}
              { currentPage + 2 > 0 && currentPage + 2 < totalElements / limit && <PaginationButton pageNumber={currentPage + 2} key={currentPage + 2} loadUserList={this.props.loadUserList} />}
              { currentPage + 3 > 0 && currentPage + 3 < totalElements / limit && currentPage < 2 && <PaginationButton pageNumber={currentPage + 3} key={currentPage + 3} loadUserList={this.props.loadUserList} />}
              { currentPage + 4 > 0 && currentPage + 4 < totalElements / limit && currentPage < 1 && <PaginationButton pageNumber={currentPage + 4} key={currentPage + 4} loadUserList={this.props.loadUserList} />}
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
