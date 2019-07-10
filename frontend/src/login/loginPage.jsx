import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './login.scss'
import { Modal, Header, Button} from 'semantic-ui-react'
import googleImg from './googleButton.png';


import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase';



class Login extends Component {
    constructor() {
        super();

        this.state = {
        };
    }

    signIn = () => {
        console.log(document.getElementById("username").value);
        console.log(document.getElementById("password").value);
    }
    render() {
        return (
            <Modal open = { this.props.open } closeIcon onClose = { this.props.closeModal }>
                <Header content = "Login"/>
                <Modal.Content>
                    <div className="login-username">
                        <p className="login"> Username: </p>
                        <input id="username" type="text" placeholder = "Enter username"/>
                    </div>
                    <div className="login-password">
                        <p className="login"> Password: </p>
                        <input id="password" type="password" placeholder="Enter password"/>
                    </div>
                    <div className="login-button">
                        <Button color="red" onClick={ this.props.closeModal }> Cancel </Button>
                        <Button color="green" onClick={ this.signIn }> Sign In </Button>
                    </div>
                    <p className="signup-text" onClick={ this.props.openSignUp }> Don't have an account yet? Sign up here! </p>
                </Modal.Content>
            </Modal>
        )
    }
}



export default Login;
