import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './login.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Button} from 'semantic-ui-react'


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


class Login extends Component {
    constructor() {
        super();

        this.state = {
          email: '',
          password: ''
        };

        //this.login = this.login.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        app.initializeApp(config);
        this.auth = app.auth();
        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
      this.authListener();
    }

    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }

    authListener() {
      this.auth.onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          this.setState({ user });
          localStorage.setItem('user', user.uid);
        } else {
          this.setState({ user: null });
          localStorage.removeItem('user');
        }
      });
    }

    handleGoogleLogin() {
      this.auth.signInWithPopup(this.googleProvider)
            .catch(function (error) {
                alert(error); // or show toast
                //localStorage.removeItem(firebaseAuthKey);
            });
            console.log("login");
        //localStorage.setItem(firebaseAuthKey, "1");
    }




    render() {
        return (
            <div className="loginSection">

                <Button onClick = { this.handleGoogleLogin }>Google</Button>

            </div>
        )
    }
}



export default Login;
