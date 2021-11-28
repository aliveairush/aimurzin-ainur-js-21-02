import React from 'react';
import { TaskType } from '../../types/types';
import './Task.scss';

interface Props {
  task: TaskType
  deleleTask: (taskId: number) => void
}

export default class Task extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleBtnDoneClick = this.handleBtnDoneClick.bind(this);
  }

  handleBtnDoneClick() {
    this.props.deleleTask(this.props.task.id);
  }

  render() {
    return (
      <div className="task">
        <div className="task__text">
          <h4>{this.props.task.text}</h4>
        </div>
        <div className="task__btn-section">
          <button onClick={this.handleBtnDoneClick} className="task__btn-done" type="button">Done</button>
        </div>
      </div>
    );
  }
}
