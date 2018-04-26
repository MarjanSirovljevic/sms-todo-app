import React from 'react';
import uuid from 'uuid';

import TaskCompleted from '../components/TaskCompleted';
import TaskInProgress from '../components/TaskInProgress';

const mainDiv = {
  width: '80%',
  margin: '60px auto 120px auto',
  padding: '30px',
  background: '#fcfcfc',
  boxShadow: '0 0 10px rgba(100, 100, 100, 0.3)'
};
const tableRow = {
  borderBottom: '1px dotted grey',
  height: '40px'
};
const td1 = {
  padding: '6px 0',
  textAlign: 'center',
  width: '75px'
};
const td4 = {
  padding: '6px 0',
  textAlign: 'center',
  width: '65px'
};

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.handleCompletedTask = this.handleCompletedTask.bind(this);
    this.handleRemovedTask = this.handleRemovedTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);
    this.state = {
      todos: [],
      users: [],
      addTaskMode: false,
      description: '',
      selectedUser: ''
    };
  }
  handleCompletedTask(taskId) {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === taskId) {
          return {...todo, completed: true}
        } else {
          return todo
        }
      })
    }));
  }
  handleRemovedTask(taskId) {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== taskId)
    }));
  }
  handleEditTask(modifiedTask) {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if(todo.id === modifiedTask.id) {
          return {...todo, ...modifiedTask};
        } else {
          return todo;
        }
      }),
    }));
  }
  handleAddTask() {
    this.setState(() => ({addTaskMode: true}));
  }
  handleCancel() {
    this.setState(() => ({
      addTaskMode: false,
      description: '',
      selectedUser: ''
    }));
  }
  handleDescription(e) {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }
  handleSelectChange(e) {
    const selectedUser = e.target.value;
    this.setState(() => ({ selectedUser }));
  }
  handleSaveTask() {
    const { description, selectedUser } = this.state;
    if(!description || !selectedUser) { return; }
    const matchingUser = this.state.users.filter((user) => user.name === selectedUser)[0];
    const selectedUserId = matchingUser.id;
    const newTask = {
      completed: false,
      id: uuid(),
      title: description,
      userId: selectedUserId
    };
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTask],
      addTaskMode: false,
      description: '',
      selectedUser: ''
    }));
  }
  componentWillMount() {
    try {
      const todos = JSON.parse(window.localStorage.getItem('todos'));
      const users = JSON.parse(window.localStorage.getItem('users'));
      this.setState(() => ({ users }));
      if (!todos || !Object.keys(todos)) {
        return;
      }
      this.setState(() => ({ todos }));
    } catch (error) {
      // do nothing
    }
  }
  componentDidMount(){
    if(this.state.todos.length === 0) {
      fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        const usersList = this.state.users.map((user) => user.id);
        const existingTodos = json.filter((todo) => {
          return usersList.indexOf(todo.userId.toString()) >= 0;
        });
        const reducedTodos = existingTodos.filter((todo, index) => index % 10 === 0);
        const todos = reducedTodos.map((todo) => {
          return {...todo, userId: todo.userId.toString(), id: todo.id.toString()}
        });
        this.setState(() => ({ todos }));
      })
      .catch(error => console.log(error));
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevState.todos) !== JSON.stringify(this.state.todos.length)) {
      const json = JSON.stringify(this.state.todos);
      localStorage.setItem('todos', json);
    }
  }
  render() {
    const addTask = !this.state.addTaskMode ?
    (
      <tr style={tableRow}>
        <td style={td1}>
          <button onClick={this.handleAddTask}>New Task</button>
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    ) : (
      <tr style={tableRow}>
        <td style={td1}>
          <a onClick={this.handleCancel}>Cancel</a>
        </td>
        <td>
          <input
            type="text" 
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleDescription}
          />
        </td>
        <td>
          <select value={this.state.selectedUser} onChange={this.handleSelectChange}>
            <option value="" disabled={true} >Select Name</option>
            {
              this.state.users.map((user) => <option key={user.id} value={user.name}>{user.name}</option>)
            }
          </select>
        </td>
        <td style={td4}>
          <a onClick={this.handleSaveTask}>Save</a>
        </td>
      </tr>
    );
    return (
      <div className="main" style={mainDiv}>
        <div style={{marginBottom: '50px'}}>
          <h3 style={{marginBottom: '5px'}}>Todo tasks</h3>
          <hr style={{marginBottom: 0}} />
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <tbody>
              {
                this.state.todos.filter((todo) => !todo.completed).map((todo) => {
                  return (
                    <TaskInProgress
                      key={todo.id}
                      taskId={todo.id}
                      title={todo.title} 
                      user={todo.userId} 
                      users={this.state.users}
                      handleCompletedTask={this.handleCompletedTask}
                      handleRemovedTask={this.handleRemovedTask}
                      handleEditTask={this.handleEditTask}
                    />
                  );
                })
              }
              { addTask }
            </tbody>
          </table>
        </div>
        <div  style={{marginBottom: '100px'}}>
          <h3 style={{marginBottom: '5px'}}>Completed tasks</h3>
          <hr style={{marginBottom: 0}} />
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <tbody>
              {
                this.state.todos.filter((todo) => todo.completed).map((todo) => {
                  return (
                    <TaskCompleted 
                      key={todo.id}
                      taskId={todo.id}
                      title={todo.title} 
                      user={todo.userId} 
                      users={this.state.users}
                      handleRemovedTask={this.handleRemovedTask}
                    />
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

