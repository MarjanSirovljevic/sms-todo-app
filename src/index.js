import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import AppRouter from './routers/AppRouter';

const Template = () => (
  <div>
    <AppRouter />
  </div>
);


ReactDOM.render(<Template />, document.getElementById('root'));
registerServiceWorker();
