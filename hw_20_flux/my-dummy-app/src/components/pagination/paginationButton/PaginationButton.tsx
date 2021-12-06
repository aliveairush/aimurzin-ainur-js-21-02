import React from 'react';

interface IProps {
  pageNumber: number,
  limit: number
  active?: boolean,
  loadUserList: (page: number, limit: number) => void
}

const PaginationButton = ({
  pageNumber, active = false, loadUserList, limit,
}: IProps) => {
  const handleClick = () => {
    loadUserList && loadUserList(pageNumber, limit);
  };

  return (
    <button
      className={active === true ? 'active' : ''}
      onClick={handleClick}
      type="button"
    >
      {pageNumber + 1}
    </button>
  );
};

export default PaginationButton;
