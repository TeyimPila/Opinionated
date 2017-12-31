import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom'
import configureStore from './Store/configureStore';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

// Remove these when you know your environments are being used properly
console.log("process.env.NODE_ENV", process.env.NODE_ENV)
console.log("process.env.REACT_APP_BUILD", process.env.REACT_APP_BUILD)
console.log("process.env.REACT_APP_API_URL", process.env.REACT_APP_API_URL)

if(process.env.NODE_ENV === 'development') {
    console.log("In DEV I'm going with " +  process.env.REACT_APP_API_URL)
}

if(process.env.NODE_ENV === 'production') {
    switch (process.env.REACT_APP_BUILD) {
        case "dev":
            console.log("In PRD DEV I'm going with " + process.env.REACT_APP_API_URL)
            break
        case "stg":
            console.log("In PRD STG I'm going with " + process.env.REACT_APP_API_URL)
            break
        case "prd":
            console.log("In PRD PROD I'm going with " + process.env.REACT_APP_API_URL)
            break
        default:
            console.log("In PRD Default case I'm going with " + process.env.REACT_APP_API_URL)
    }
}

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker();
