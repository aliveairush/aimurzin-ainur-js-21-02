import React, { ReactNode, SyntheticEvent } from 'react';
import './ShowIdHelper.scss';

interface Props {
  children: ReactNode;
  id: string
}

interface State {
  hovered: boolean;
}

export default class ShowIdHelper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hovered: false };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  mouseOver(e: SyntheticEvent) {
    this.setState({ hovered: true });
    e.stopPropagation();
  }

  mouseLeave(e: SyntheticEvent) {
    this.setState({ hovered: false });
    e.stopPropagation();
  }

  render() {
    return (
      <div
        className="show-id-wrapper"
        onMouseOver={this.mouseOver}
        onMouseLeave={this.mouseLeave}
      >
        {this.state.hovered && <div className="show-id-wrapper__id">{this.props.id}</div>}
        {this.props.children}
      </div>
    );
  }
}
