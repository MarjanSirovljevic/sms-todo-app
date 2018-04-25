import React from 'react';
import { Link } from 'react-router-dom';

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
const button = {
  background: 'white',
  padding: '6px',
  border: '1px solid green'
};

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      users: []
    };
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
    if(prevState.todos.length !== this.state.todos.length) {
      const json = JSON.stringify(this.state.todos);
      localStorage.setItem('todos', json);
    }
  }
  render() {
    // console.log(this.state.todos);
    return (
      <div className="main" style={{width: '85%', margin: '20px auto'}}>
        <div style={{marginBottom: '50px'}}>
          <h3 style={{marginBottom: '5px'}}>Todo tasks</h3>
          <hr style={{marginBottom: 0}} />
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <tbody>
              {
                this.state.todos.filter((todo) => todo.completed).map((todo) => {
                  return <TaskInProgress key={todo.id} title={todo.title} user={todo.userId} users={this.state.users} />;
                })
              }
              <tr>
                <td style={td1}>
                  <button style={button}>New Task</button>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 style={{marginBottom: '5px'}}>Completed tasks</h3>
          <hr style={{marginBottom: 0}} />
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <tbody>
              {
                this.state.todos.filter((todo) => !todo.completed).map((todo) => {
                  return <TaskCompleted key={todo.id} title={todo.title} user={todo.userId} users={this.state.users} />;
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
  // console.log(props);
  const selectedUser = props.users.filter((user) => user.id === props.user)[0].name;
  // console.log(selectedUser);
  return (
    <tr style={tableRow}>
      <td style={td1}>
        <a style={link}><span style={completed}>+</span></a>
        <span style={{width: '10px', display: 'inline-block'}}></span>
        <a style={link}><span style={remove}>-</span></a>
      </td>
      <td style={td2}>{props.title}</td>
      <td style={td3}>
        <Link to={`/user/${props.user}`}>
          {selectedUser}
        </Link>
      </td>
      <td style={td4}>
        <a onClick={() => {
          console.log('edit');
        }}>Edit</a>
      </td>
    </tr>
  );
};

const TaskCompleted = (props) => {
  const selectedUser = props.users.filter((user) => user.id === props.user)[0].name;
  return (
    <tr style={tableRow}>
      <td style={td1}>
        <a style={link}><span style={remove}>-</span></a>
      </td>
      <td style={td2}>{props.title}</td>
      <td style={td3}>{selectedUser}</td>
      <td style={td4}></td>
    </tr>
  );
};