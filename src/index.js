import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const Template = () => (
  <div>
    <h1>Hello SMS Team</h1>
    <p>Are you ready to rock !!!</p>
  </div>
);


ReactDOM.render(<Template />, document.getElementById('root'));
registerServiceWorker();
