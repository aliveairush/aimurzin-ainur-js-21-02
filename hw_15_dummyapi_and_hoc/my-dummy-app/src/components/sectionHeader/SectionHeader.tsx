import React from 'react';
import ChangeLimitButton from '../changePageLimitButton/ChangeLimitButton';
import './SectionHeader.scss';

interface IProps {
  changeLimit: (limit: number) => void;
}

export default class SectionHeader extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className="section-header">
        <h1>Пользователи</h1>
        <div>
          <span>Показать:</span>
          <ChangeLimitButton limit={10} changeLimit={this.props.changeLimit} />
          <ChangeLimitButton limit={30} changeLimit={this.props.changeLimit} />
          <ChangeLimitButton limit={100} changeLimit={this.props.changeLimit} />
        </div>
      </div>
    );
  }
}
