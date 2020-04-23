import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TagManager from 'react-gtm-module';
import App from './App';

const tagManagerArgs = {
    gtmId: 'GTM-TLRF5P2',
}

TagManager.initialize(tagManagerArgs)



ReactDOM.render(<App />, document.getElementById('root'));