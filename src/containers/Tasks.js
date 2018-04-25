import React from 'react';

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
    console.log(this.state.todos);
    return (
      <div className="main" style={{width: '70%', margin: '20px auto'}}>
        <div style={{marginBottom: '100px'}}>
          <h3>Todo tasks</h3>
          <hr />
          <table>
            <tbody>
              {
                this.state.todos.filter((todo) => todo.completed).map((todo) => {
                  return <Task key={todo.id} title={todo.title} user={todo.userId} />;
                })
              }
            </tbody>
          </table>
        </div>
        <div>
          <h3>Completed tasks</h3>
          <hr />
          <table>
            <tbody>
              {
                this.state.todos.filter((todo) => !todo.completed).map((todo) => {

                  return <Task key={todo.id} title={todo.title} user={todo.userId} />;
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


const Task = (props) => {
  console.log(props);
  return (
    <tr>
      <td>
        <a style={{width: '20px', height: '20px', textDecoration: 'none', border: '1px solid green', display: 'inline-block'}}>+</a>
        <a style={{width: '20px', height: '20px', textDecoration: 'none', border: '1px solid green', display: 'inline-block'}}>-</a>
      </td>
      <td>{props.title}</td>
      <td>{props.user}</td>
    </tr>
  );
};