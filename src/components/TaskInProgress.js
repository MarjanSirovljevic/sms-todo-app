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

export default class TaskInProgress extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);

    this.state = {
      inEditMode: false,
      description: '',
      selectedUser: ''
    }
  }
  handleEditTask() {
    const matchingUser = this.props.users.filter((user) => user.id === this.props.user)[0];
    const mathchingUserName = matchingUser.name;
    this.setState(() => ({
      inEditMode: true,
      description: this.props.title,
      selectedUser: mathchingUserName
    }));
  }
  handleSelectChange(e) {
    const selectedUser = e.target.value;
    this.setState(() => ({ selectedUser }));
  }
  handleCancel() {
    this.setState(() => ({
      inEditMode: false,
      description: '',
      selectedUser: ''
    }));
  }
  handleDescription(e) {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }
  handleSaveTask() {
    const { description, selectedUser } = this.state;
    if(!description || !selectedUser) { return; }

    const matchingUser = this.props.users.filter((user) => user.name === selectedUser)[0];
    const selectedUserId = matchingUser.id;

    const modifiedTask = {
      completed: false,
      id: this.props.taskId,
      title: this.state.description,
      userId: selectedUserId
    };
    this.setState(() => ({
      inEditMode: false,
      description: '',
      selectedUser: ''
    }));
    this.props.handleEditTask(modifiedTask);
  }
  render() {
    const selectedUser = this.props.users.filter((user) => user.id === this.props.user)[0].name;
    const presentationMode = (
      <tr style={tableRow}>
        <td style={td1}>
          <a style={link} onClick={() => this.props.handleCompletedTask(this.props.taskId)}>
            <span style={completed}>+</span>
          </a>
          <span style={{width: '10px', display: 'inline-block'}}></span>
          <a style={link} onClick={() => this.props.handleRemovedTask(this.props.taskId)}>
            <span style={remove}>-</span>
          </a>
        </td>
        <td style={td2}>{this.props.title}</td>
        <td style={td3}>
          <Link to={`/user/${this.props.user}`}>
            {selectedUser}
          </Link>
        </td>
        <td style={td4}>
          <a onClick={this.handleEditTask}>Edit</a>
        </td>
      </tr>
    );
    const editMode = (
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
          style={{width: '80%'}}
        />
      </td>
      <td>
        <select value={this.state.selectedUser} onChange={this.handleSelectChange}>
          {
            this.props.users.map((user) => <option key={user.id} value={user.name}>{user.name}</option>)
          }
        </select>
      </td>
      <td style={td4}>
        <a onClick={this.handleSaveTask}>Save</a>
      </td>
    </tr>
    );
    return !this.state.inEditMode ? presentationMode : editMode;
  }
}