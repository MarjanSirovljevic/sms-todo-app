import React from 'react';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isValid: true
    };
  }
  onChange(e) {
    const { name, handleChange, handleValidate } = this.props;
    const value = e.currentTarget.value;
    handleChange(name, value);
    if(!handleValidate) { return; } // we create this statement just for Login component
    if(!value) { return; }
    const isValid = handleValidate(value);
    this.setState(() => ({ isValid }));
  }
  render() {
    const { name, type, placeholder, label, errorMessage } = this.props;
    return (
      <div style={{marginBottom: '10px'}}>
        <label>{label}</label>
        <br />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={this.onChange}
        />
        {
          !this.state.isValid &&
          errorMessage.map((error) => <div key={error} style={{ color: 'red' }}>{error}</div>)
        }
      </div>
    );
  }
}