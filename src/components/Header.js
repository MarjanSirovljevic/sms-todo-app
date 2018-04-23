import React from 'react';

const header = {
  background: 'yellow',
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const Header = (props) => {
  return (
    <header style={header}>
      Header
    </header>
  );
};

export default Header;
