import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './login.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Button} from 'semantic-ui-react'
import googleImg from './googleButton.png';


import app from 'firebase/app';
import 'firebase/auth';




class Login extends Component {
    constructor() {
        super();

        this.state = {
        };

        //this.login = this.login.bind(this);
        //this.handleChange = this.handleChange.bind(this);

        this.auth = app.auth();
        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
        this.handleGoogleLogout = this.handleGoogleLogout.bind(this);
        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
      this.authListener();
    }

    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
      console.log("STATE CHANGE", this.state);
    }

    authListener() {
      this.auth.onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          this.setState({ user });
          localStorage.setItem('user', user.uid);
          localStorage.setItem('name', user.displayName);
          localStorage.setItem('imageURL', user.photoURL);
          localStorage.setItem('email', user.email);
        } else {
          this.setState({ user: null });
          localStorage.removeItem('user');
          localStorage.removeItem('name');
          localStorage.removeItem('imageURL');
          localStorage.removeItem('email');
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

    handleGoogleLogout() {
      this.auth.signOut().then(() => {
        this.setState({
          user: null
        });
      });
            console.log("login");
        //localStorage.setItem(firebaseAuthKey, "1");
    }


    render() {

          if(this.state.user){
            return(
              <div >
                <Button onClick = { this.handleGoogleLogout }>logout</Button>

              </div>
            )
          }else{
            return(
              <div className="loginSection">
                  <img className="googleButton" src={googleImg} onClick = { this.handleGoogleLogin }/>
              </div>
            )
          }

    }
}



export default Login;
