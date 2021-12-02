import React from 'react';
import ChangeLimitButton from '../changePageLimitButton/ChangeLimitButton';
import './SectionHeader.scss';

interface IProps {
  changeLimit: (limit: number) => void;
}

const SectionHeader = ({ changeLimit }: IProps) => (
  <div className="section-header">
    <h1>Пользователи</h1>
    <div>
      <span>Показать:</span>
      <ChangeLimitButton limit={5} changeLimit={changeLimit} />
      <ChangeLimitButton limit={10} changeLimit={changeLimit} />
      <ChangeLimitButton limit={20} changeLimit={changeLimit} />
    </div>
  </div>
);

export default SectionHeader;
