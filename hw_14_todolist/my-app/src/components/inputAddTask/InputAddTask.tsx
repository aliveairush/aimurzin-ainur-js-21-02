import React from 'react';
import './InputAddTask.scss';

interface Props {
  addTask?: (newTask: string) => void;
}

interface State{
  inputValue: string;
}

export default class InputAddTask extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ inputValue: e.currentTarget.value });
  }

  handleClick() {
    this.props.addTask && this.props.addTask(this.state.inputValue);
    this.setState({ inputValue: '' });
  }

  render() {
    return (
      <div className="input-add-task">
        <input
          onChange={this.handleChange}
          className="input-add-task__input"
          type="text"
          placeholder="Введите название задачи"
          value={this.state.inputValue}
        />
        <button onClick={this.handleClick} className="input-add-task__btn" type="button">Добавить</button>
      </div>
    );
  }
}
