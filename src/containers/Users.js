import React from 'react';

class Users extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(json => this.setState({users: json}));
}

  render(){
    return(
      <div>
        
      </div>
    )
  }

}

export default Users;