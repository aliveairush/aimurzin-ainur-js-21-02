import React from 'react';

interface IProps {
  pageNumber: number,
  active?: boolean,
  loadUserList: (page: number) => void
}

const PaginationButton = ({ pageNumber, active = false, loadUserList }: IProps) => {
  const handleClick = () => {
    loadUserList && loadUserList(pageNumber);
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
