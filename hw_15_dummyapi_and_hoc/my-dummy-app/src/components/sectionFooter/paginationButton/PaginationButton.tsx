import React from 'react';

interface IProps {
  pageNumber: number,
  active?: boolean,
  loadUserList?: (page: number) => void
}
export default class PaginationButton extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.loadUserList && this.props.loadUserList(this.props.pageNumber);
  }

  render() {
    return (
      <button
        className={this.props.active === true ? 'active' : ''}
        onClick={this.handleClick}
        type="button"
      >
        {this.props.pageNumber + 1}
      </button>
    );
  }
}
