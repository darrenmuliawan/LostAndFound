import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminHomepage from './admin-homepage.jsx';
import AdminDetails from './admin-details.jsx';
import Login from './login'
import SubmissionForm from './SubmissionForm/SubmissionForm.jsx'
import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/admin" component={AdminHomepage} />
          <Route exact path="/admin/adminusername" component={AdminDetails} />
          <Route exact path="/form" component={SubmissionForm} />
          <Route exact path="/login" component={Login}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
