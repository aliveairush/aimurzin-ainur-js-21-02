import React from 'react';
import './App.css';
import Todolist from './forms/todolist/Todolist';
import InputAddTask from './components/inputAddTask/InputAddTask';
import { TaskType } from './types/types';

interface State {
  latestId: number;
  tasks: Array<TaskType>
}

class App extends React.Component<{ }, State> {
  constructor(props: {}) {
    super(props);
    // Получить с localStorage все таски
    const tasks: Array<TaskType> = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Получить последний id (от него будут создаваться новые задачи)
    const maxId = tasks.reduce(
      (max, task) => (task.id > max ? task.id : max),
      0,
    );

    this.state = {
      tasks,
      latestId: maxId,
    };

    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  addTask(newTask: string) {
    const newListOfTasks = [...this.state.tasks, { text: newTask, id: this.state.latestId + 1 }];
    this.setState({ tasks: newListOfTasks, latestId: this.state.latestId + 1 });
    localStorage.setItem('tasks', JSON.stringify(newListOfTasks));
  }

  deleteTask(taskId: number) {
    const newListOfTasks = this.state.tasks.filter((elem) => elem.id !== taskId);
    this.setState({ tasks: newListOfTasks });
    localStorage.setItem('tasks', JSON.stringify(newListOfTasks));
  }

  render() {
    return (
      <div className="App">
        <div className="app-content">
          <InputAddTask addTask={this.addTask} />
          <Todolist tasks={this.state.tasks} deleteTask={this.deleteTask} />
        </div>
      </div>
    );
  }
}

export default App;
