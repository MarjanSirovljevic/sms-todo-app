import React from 'react';
import uuid from 'uuid';

import User from '../components/User';

class Users extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(json => this.setState({users: json}));
}

render(){
  return(
      <div>
        {<table>
          <tbody>
          <tr>
            <th>Full name</th>
            <th>Email</th> 
          </tr>
         
        
        {
          this.state.users.map((user) => <User key={user.id} {...user} />)
        } 
        </tbody>
        </table>}
      </div>
  )
}
}

export default Users;

console.log(uuid());