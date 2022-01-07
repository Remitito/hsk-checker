import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './RouteComponents/App';
import Home from './RouteComponents/Home';
import NavBar from './RouteComponents/NavBar';
import Browse from './RouteComponents/Browse';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

ReactDOM.render(
  <Router>
    <NavBar/>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/check" component={App}/>
      <Route path="/browse" component={Browse}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
