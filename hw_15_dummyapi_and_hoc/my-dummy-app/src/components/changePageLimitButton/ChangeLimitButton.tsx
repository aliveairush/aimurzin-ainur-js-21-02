import React from 'react';
import './ChangeLimitButton.scss';

interface IProps {
  limit: number
  changeLimit: (limit: number) => void;
}
export default class ChangeLimitButton extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.changeLimit(this.props.limit);
  }

  render() {
    return (
      <span className="change-page-limit" onClick={this.handleClick}>{this.props.limit}</span>
    );
  }
}
