import React from 'react';
import './SectionFooter.scss';
import Pagination from '../pagination/Pagination';
import ThemeToggle from '../themeToggle/ThemeToggle';

interface IProps {
  currentPage: number,
  totalElements: number,
  limit: number,
  loadUserList: (page: number) => void
}

export default class SectionFooter extends React.Component<IProps, any> {
  render() {
    return (
      <div className="section-footer">
        <Pagination
          currentPage={this.props.currentPage}
          totalElements={this.props.totalElements}
          limit={this.props.limit}
          loadUserList={this.props.loadUserList}
        />
        <ThemeToggle />
      </div>
    );
  }
}
