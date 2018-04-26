import React from 'react';
import bojana from '../assets/bojana.JPG';
import vladan from '../assets/vladan.jpg';
import marjan from '../assets/marjan.jpg';

const about_us = {
  width: '480px',
  margin: '60px auto',
  padding: '30px',
  background: '#f5f5f5',
  boxShadow: '0 0 10px rgba(100, 100, 100, 0.3)'
};

const details = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems:'center',
  padding: '10px 20px'
};
const img = {
  borderRadius: '50%',
  border: '2px solid black',
  flex: 0,
  height: '125px'
};
const detailsInfo = {
  flex: 1,
  textAlign: 'left',
  fontSize: '16px'
};
const para = {
  margin: '3px 30px',
  fontStyle: 'italic'
};

const AboutUs = () => (
  <div className="main" style={about_us} >
    <h1 style={{marginBottom: '5px', paddingLeft: '30px'}}>SMS Team</h1>
    <hr />
    <Details src={bojana} name="Bojana Markovic" email="bojana.markovic2412@gmail.com" />
    <Details src={vladan} name="Vladan Slijepcevic" email="10vladan@gmail.com" />
    <Details src={marjan} name="Marjan Sirovljevic" email="marjansirovljevic@gmail.com" />
  </div>
);

const Details = (props) => {
  return (
    <div style={details}>
      <div>
        <img src={props.src} style={img}/>
      </div>
      <div style={detailsInfo}>
        <p style={para}>Front-End Developer</p>
        <p style={para}>{props.name}</p>
        <p style={para}>{props.email}</p>
      </div>
    </div>
  );
};

export default AboutUs;