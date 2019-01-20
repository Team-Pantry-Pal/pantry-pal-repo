// Import external style libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import registerServiceWorker from './registerServiceWorker';
// Import global stylesheet
import './styles/_globalStyles.css';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();