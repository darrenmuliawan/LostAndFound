import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminHomepage from './admin-homepage.jsx';
import AdminDetails from './admin-details.jsx';
import SubmissionForm from './SubmissionForm/SubmissionForm.jsx'
import Login from './login/login.jsx';
import Home from './home/home.jsx';
import UserHome from './UserHome/user-home.jsx';
// import AdminDetails from './admin-details.jsx'; <Route exact path="/admin/adminusername" component={AdminDetails}/>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import 'semantic-ui-css/semantic.min.css'
import app from 'firebase/app';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyAXh0bhHnzUDfFmEdnX0yyLuLbncYhNAqE",
  authDomain: "ilini-lostandfound.firebaseapp.com",
  databaseURL: "https://ilini-lostandfound.firebaseio.com",
  projectId: "ilini-lostandfound",
  storageBucket: "ilini-lostandfound.appspot.com",
  messagingSenderId: "596991029999"
};

class App extends Component {

  constructor() {
      super();

      this.state = {
        authUser: null,
      };

      app.initializeApp(config);
      this.auth = app.auth();
    }

  componentDidMount() {
    this.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/admin" component={AdminHomepage}/>
          <Route exact path="/admin/adminusername" component={AdminDetails} />
          <Route exact path="/form" component={SubmissionForm} />
          <Route exact path="/" component={Home} isAuthed={false}/>
          <Route exact path="/user" component={UserHome}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
