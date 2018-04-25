import React from 'react';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }
  componentWillMount() {
    try {
      const todos = JSON.parse(window.localStorage.getItem('todos'));
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
        const todos = json.map((todo) => {
          return {...todo, userId: todo.userId.toString(), id: todo.id.toString()}
        });
        this.setState(() => ({ todos }));
      })
      .catch(error => console.log(error));
    }
  }
  render() {
    console.log(this.state.todos);
    return (
      <div className="main">
        Tasks Page TEST
      </div>
    );
  }
}