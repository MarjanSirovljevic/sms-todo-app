import React from 'react';

const header = {
  background: 'yellow',
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

export default class Header extends React.Component {
  render() {
    return (
      <header style={header}>
        Header
      </header>
    );
  }
}
