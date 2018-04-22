import React from 'react';

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
          this.state.users.map(
              (user) =>
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{<a href="/link/to/">Details</a>}</td>
                </tr>
          )
        } 
        </tbody>
        </table>}
      </div>
  )
}
}

export default Users;