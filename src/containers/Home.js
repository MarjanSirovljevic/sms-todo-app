import React from 'react';

const mainDiv = {
  width: '500px',
  margin: '60px auto',
  padding: '30px',
  background: '#fcfcfc',
  boxShadow: '0 0 10px rgba(100, 100, 100, 0.3)'
};

const Home = () => (
  <div className="main" style={mainDiv}>
    <h1>SMS To-Do </h1>
      <h2>Time to organize your work</h2>
        <p>with this app for getting things done</p>
        <br/>
      <h2>What is SMS to-do app?</h2>
        <p>SMS to-do app is a simple way to track tasks that need to be done.
           This application hold tasks, which are the main app entities.
           Application supports creating, listing, editing and deleting tasks.
           Also, individual tasks can be easily distributed to the desired users
           depending on the need.</p>
        <br/>
      <h2>Why use SMS to-do app?</h2>
        <p>One of the main benefits of using this application is a good organization.
           Seeing a clear outline of your completed and uncompleted tasks will help you
           feel organized and stay mentally focused. Having a list of all your tasks will
           allow you to sit down and make a plan. As you cross items off your to-do list,
           you'll feel a sense of progress and accomplishment.
           The affirmation that you are making progress will help motivate you to keep
           moving forward rather than feeling overwhelmed.
        </p>
    
    </div>
);

export default Home;