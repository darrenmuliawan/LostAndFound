import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import AdminHomepage from './adminPage/admin-homepage.jsx';
import AdminDetails from './adminPage/admin-details.jsx';
import AdminActivities from './adminPage/admin-history.jsx';
import AdminAnalytics from './adminPage/admin-analytics.jsx';
import SubmissionForm from './SubmissionForm/SubmissionForm.jsx'
import Navbar from './nav-bar/userNavbar.jsx'
import Login from './login/login.jsx';
import Home from './home/home.jsx';
import UserHome from './UserHome/user-home.jsx';
// import AdminDetails from './admin-details.jsx'; <Route exact path="/admin/adminusername" component={AdminDetails}/>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import 'semantic-ui-css/semantic.min.css'

class App extends Component {

render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/:id/a" component={AdminHomepage}/>
          <Route exact path="/:id/u" component={UserHome}/>
          <Route exact path="/:id/profile" component={AdminDetails}/>
          <Route exact path="/:id/history" component={AdminActivities}/>
          <Route exact path="/:id/a/analytics" component={AdminAnalytics}/>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
