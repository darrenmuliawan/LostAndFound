import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './home.scss'
import Login from '../login/loginPage.jsx'
import SignUp from '../login/signUpPage.jsx'
import NavBar from '../nav-bar/navbar.jsx'

class Home extends Component {
    constructor() {
        super();

        this.state = {
          user: {
          },
          open: false,
          openSignUp: false,
        };
    }

    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
    }

    openLoginPage = () => {
      this.setState({
        open: !this.state.open,
      })
    }

    openSignUpPage = () => {
      this.setState({
        open: false,
        openSignUp: !this.state.openSignUp
      })
    }

    openSignInPage = () => {
      this.setState({
        open: true,
        openSignUp: false,
      })
    }
    
    closeSignUpPage = () => {
      this.setState({
        openSignUp: false,
      })
    }

    render() {
        console.log(this.state.user);
        console.log(this.state.open);
        
        return (
          <div className="sections">
              <NavBar
                open = { this.openLoginPage }
              />
              <div className="homepage-pic">
                <div className="homepage-pic-title">
                  <p> You Lost It. We Found It. </p>
                </div>
                <div className="get-started-text"> 
                  <p className="get-started-text"> Get Started &rarr; </p>
                </div>
              </div>
              <Login
                open = { this.state.open }
                closeModal = { this.openLoginPage }
                openSignUp = { this.openSignUpPage }
              />
              <SignUp 
                open = { this.state.openSignUp }
                closeModal = { this.closeSignUpPage }
                openSignIn = { this.openSignInPage }
              />

          </div>
        )
    }
}



export default Home;
