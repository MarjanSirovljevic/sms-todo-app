import React from 'react';

export default class Input extends React.Component {
  render() {
    const { name, type, placeholder, label } = this.props;
    return (
      <div style={{marginBottom: '10px'}}>
        <label>{label}</label>
        <br />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
        />
      </div>
    );
  }
}