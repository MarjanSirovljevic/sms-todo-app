import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';

const mainDiv = {
  width: '85%', 
  margin: '20px auto'
};
const link = {
  textAlign: 'center',
  textDecoration: 'none'
};
const completed = {
  width: '20px',
  color: 'green',
  fontWeight: 'bold',
  display: 'inline-block',
  background: 'lightgrey'
};
const remove = {
  width:'20px',
  color: 'red',
  fontWeight: 'bold',
  display: 'inline-block',
  background: 'lightgrey'
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
const td2 = {
  padding: '6px'
};
const td3 = {
  padding: '6px',
  width: '200px'
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
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);
    this.state = {
      todos: [],
      users: [],
      addUserMode: false,
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
  handleAddTask() {
    this.setState(() => ({addUserMode: true}));
  }
  handleCancel() {
    this.setState(() => ({
      addUserMode: false,
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
      addUserMode: true,
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
        const reducedTodos = existingTodos.filter((todo, index) => index % 11 === 0);
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
    const addTask = !this.state.addUserMode ?
    (
      <tr>
        <td style={td1}>
          <button onClick={this.handleAddTask}>New Task</button>
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    ) : (
      <tr>
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

const TaskInProgress = (props) => {
  const selectedUser = props.users.filter((user) => user.id === props.user)[0].name;
  return (
    <tr style={tableRow}>
      <td style={td1}>
        <a style={link} onClick={() => props.handleCompletedTask(props.taskId)}>
          <span style={completed}>+</span>
        </a>
        <span style={{width: '10px', display: 'inline-block'}}></span>
        <a style={link} onClick={() => props.handleRemovedTask(props.taskId)}>
          <span style={remove}>-</span>
        </a>
      </td>
      <td style={td2}>{props.title}</td>
      <td style={td3}>
        <Link to={`/user/${props.user}`}>
          {selectedUser}
        </Link>
      </td>
      <td style={td4}>
        <a onClick={() => console.log('edit')}>Edit</a>
      </td>
    </tr>
  );
};

const TaskCompleted = (props) => {
  const selectedUser = props.users.filter((user) => user.id === props.user)[0].name;
  return (
    <tr style={tableRow}>
      <td style={td1}>
        <a style={link} onClick={() => props.handleRemovedTask(props.taskId)}>
          <span style={remove}>-</span>
        </a>
      </td>
      <td style={td2}>{props.title}</td>
      <td style={td3}>{selectedUser}</td>
      <td style={td4}></td>
    </tr>
  );
};