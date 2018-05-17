import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as api from '@/api';
import registerServiceWorker from './registerServiceWorker';
React.Component.prototype.$api = api;
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
