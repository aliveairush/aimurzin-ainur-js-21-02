import React from 'react';
import Task from '../../components/task/Task';
import { TaskType } from '../../types/types';

interface Props {
  tasks: Array<TaskType>
  deleteTask: (taskId: number) => void;
}

export default class Todolist extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="todolist">
        {this.props.tasks.map(
          (elem: TaskType, index:number) => <Task deleleTask={this.props.deleteTask} task={elem} key={index} />,
        )}
      </div>
    );
  }
}
