import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AdminHomepage from './admin-homepage.jsx';
import Login from './login.jsx';
// import AdminDetails from './admin-details.jsx'; <Route exact path="/admin/adminusername" component={AdminDetails}/>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/admin" component={AdminHomepage}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
