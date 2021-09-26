import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import "./SharedStyles/reset.css";

ReactDOM.render(<Router><App /></Router>,document.getElementById('root'));