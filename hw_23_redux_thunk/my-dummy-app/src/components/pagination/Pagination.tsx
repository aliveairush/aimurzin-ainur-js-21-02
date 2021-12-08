import React from 'react';
import PaginationButton from './paginationButton/PaginationButton';
import './Pagination.scss';

interface IProps {
  currentPage: number,
  totalElements: number,
  limit: number,
  loadUserList: (page: number, limit: number) => void
}

const Pagination = ({
  currentPage, totalElements, limit, loadUserList,
}: IProps) => {
  const totalPages = Math.ceil(totalElements / limit);

  return (
    <div className="pagination">
      {/**
      Шаг 1) Создаем массив чисел всех возможнных страницы
      Шаг 2) Фильтрацияю. Выбираем 3 отрезка которые могут отображаться и берем по бокам на 1-ну страницу больше
      Шаг 3) При маппинге проверяем если номер страницы не граничный отображаем кнопку иначе троеточие
      * */}
      {Array.from({ length: totalPages }, (v, k) => k)
        .filter((page) => (page <= 3)
          || (page >= currentPage - 1 && page <= currentPage + 1)
          || (page >= totalPages - 4))
        .map((pageNumber) => {
          if ((pageNumber <= 2)
            || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          || (pageNumber >= totalPages - 3)) {
            return (
              <PaginationButton
                pageNumber={pageNumber}
                key={pageNumber}
                loadUserList={loadUserList}
                limit={limit}
                active={currentPage === pageNumber}
              />
            );
          }
          return <span key={pageNumber}>...</span>;
        })}
    </div>
  );
};

export default Pagination;
