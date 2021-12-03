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

const SectionFooter = ({
  currentPage, totalElements, limit, loadUserList,
}: IProps) => (
  <div className="section-footer">
    <Pagination
      currentPage={currentPage}
      totalElements={totalElements}
      limit={limit}
      loadUserList={loadUserList}
    />
    <ThemeToggle />
  </div>
);

export default SectionFooter;
