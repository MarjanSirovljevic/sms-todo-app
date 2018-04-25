import React from 'react';

const UserDetails = (props) => {
  const id = props.match.params.id;
  const users = JSON.parse(window.localStorage.getItem('users'));
  const userDetails = users.filter((user) => user.id === id )[0];
  const { name, username, email, phone, website, address, company } = userDetails;
  
  return (
    <div style={{width: '600px', margin: '0 auto', padding: '30px'}}>
      <h2>{name} details:</h2>
      <hr style={{borderColor: 'blue', height: '1px'}} />
      <ul>
        <li>Full name: {name}</li>
        <li>User name: {username}</li>
        <li>Email address: {email}</li>
        {phone && <li>Phone number: {phone}</li>}
        {website && <li>Website: {website}</li>}
        {address.street && <li>Address: {address.street}, {address.suite} - {address.city}</li>}
        {company.name && <li>Company: {company.name}</li>}
      </ul>
      <hr style={{borderColor: 'blue', height: '1px'}} />
      <button onClick={() => {
        props.history.push('/users');
      }}>Back to Users</button>
    </div>
  );
};

export default UserDetails;