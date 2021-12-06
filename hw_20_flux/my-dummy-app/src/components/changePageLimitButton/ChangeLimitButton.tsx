import React from 'react';
import './ChangeLimitButton.scss';

interface IProps {
  limit: number
  changeLimit: (limit: number) => void;
}
const ChangeLimitButton = ({ limit, changeLimit }: IProps) => (
  <span className="change-page-limit" onClick={() => changeLimit(limit)}>{limit}</span>
);

export default ChangeLimitButton;
