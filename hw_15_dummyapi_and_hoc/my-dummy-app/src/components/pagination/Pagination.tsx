import React from 'react';
import PaginationButton from './paginationButton/PaginationButton';
import './Pagination.scss';

interface IProps {
  currentPage: number,
  totalElements: number,
  limit: number,
  loadUserList: (page: number) => void
}

const Pagination = ({
  currentPage, totalElements, limit, loadUserList,
}: IProps) => (
  <div className="pagination">
    { currentPage - 3 > 0 && totalElements / limit - currentPage < 2
      && (
        <PaginationButton
          pageNumber={currentPage - 4}
          key={currentPage - 4}
          loadUserList={loadUserList}
        />
      )}
    { currentPage - 2 > 0 && totalElements / limit - currentPage < 1
      && (
        <PaginationButton
          pageNumber={currentPage - 3}
          key={currentPage - 3}
          loadUserList={loadUserList}
        />
      )}
    { currentPage - 1 > 0 && (
    <PaginationButton
      pageNumber={currentPage - 2}
      key={currentPage - 2}
      loadUserList={loadUserList}
    />
    )}
    { currentPage > 0 && (
    <PaginationButton
      pageNumber={currentPage - 1}
      key={currentPage - 1}
      loadUserList={loadUserList}
    />
    )}
    <PaginationButton
      loadUserList={loadUserList}
      pageNumber={currentPage}
      key={currentPage}
      active
    />
    { currentPage + 1 > 0 && currentPage + 1 < totalElements / limit
      && (
        <PaginationButton
          pageNumber={currentPage + 1}
          key={currentPage + 1}
          loadUserList={loadUserList}
        />
      )}
    { currentPage + 2 > 0 && currentPage + 2 < totalElements / limit
      && (
        <PaginationButton
          pageNumber={currentPage + 2}
          key={currentPage + 2}
          loadUserList={loadUserList}
        />
      )}
    { currentPage + 3 > 0 && currentPage + 3 < totalElements / limit && currentPage < 2
      && (
        <PaginationButton
          pageNumber={currentPage + 3}
          key={currentPage + 3}
          loadUserList={loadUserList}
        />
      )}
    { currentPage + 4 > 0 && currentPage + 4 < totalElements / limit && currentPage < 1
      && (
        <PaginationButton
          pageNumber={currentPage + 4}
          key={currentPage + 4}
          loadUserList={loadUserList}
        />
      )}
  </div>
);

export default Pagination;
