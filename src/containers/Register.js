import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

export default class Register extends React.Component {
  render() {
    return (
      <div className="main" style={{marginTop: '50px'}}>
        <Input />
        <Button />
      </div>
    );
  }
}