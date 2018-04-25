import React from 'react';

const footer = {
  background: 'yellow',
  width: '100%',
  position: 'fixed',
  bottom: 0,
  zIndex: 1000,
  textAlign: 'center',
  padding: '5px 0'
};

const Footer = () => (
  <footer style={footer}>
    <div>Created by - SMS Team</div>
    <div>PZORG - 2018</div>
    <a href="#top">Go Top</a>
  </footer>
);

export default Footer;
