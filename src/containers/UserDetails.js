import React from 'react';

const mainDiv = {
  width: '500px',
  margin: '60px auto',
  padding: '30px',
  background: '#fcfcfc',
  boxShadow: '0 0 10px rgba(100, 100, 100, 0.3)'
};
const buttonDiv = {
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  padding: '10px 10px'
};
const button = {
  marginLeft: '5px'
};
const ul = {
  listStyleType: 'none',
  paddingLeft: 0
};
const li = {
  display: 'flex',
  justifyContent: 'space-between'
}
const span1 = {
  flex: 1
};
const span2 = {
  flex: 2,
  color: '#3d75aa',
  fontWeight: 'bold'
};
const hr = {
  height: '5px',
  background: '#3d75aa'
};

const UserDetails = (props) => {
  const id = props.match.params.id;
  const users = JSON.parse(window.localStorage.getItem('users'));
  const userDetails = users.filter((user) => user.id === id )[0];
  const { name, username, email, phone, website, address, company } = userDetails;
  
  return (
    <div style={mainDiv}>
      <h2 style={{textAlign: 'center', marginBottom: '5px'}}>{name} details:</h2>
      <hr style={hr} />
      <ul style={ul}>
        <li style={li}><span style={span1}>Full name: </span><span style={span2}>{name}</span></li>
        <li style={li}><span style={span1}>User name: </span><span style={span2}>{username}</span></li>
        <li style={li}><span style={span1}>Email address: </span><span style={span2}>{email}</span></li>
        {phone && <li style={li}><span style={span1}>Phone number: </span><span style={span2}>{phone}</span></li>}
        {website && <li style={li}><span style={span1}>Website: </span><span style={span2}>{website}</span></li>}
        {address.street && <li style={li}><span style={span1}>Address: </span><span style={span2}>{address.street}, {address.suite} - {address.city}</span></li>}
        {company.name && <li style={li}><span style={span1}>Company: </span><span style={span2}>{company.name}</span></li>}
      </ul>
      <hr style={hr} />
      <div style={buttonDiv}>
        <button style={button} onClick={() => {
          props.history.push('/users');
        }}>Back to Users</button>
        <button style={button} onClick={() => {
          props.history.push('/tasks');
        }}>Back to Tasks</button>
      </div>
    </div>
  );
};

export default UserDetails;