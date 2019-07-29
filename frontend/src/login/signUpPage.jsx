import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom'
import './signup.scss'
import { Modal, Header, Button, Message } from 'semantic-ui-react'
import googleImg from './googleButton.png';
import axios from 'axios';

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase';
import Axios from 'axios';



class signup extends Component {
    constructor() {
        super();

        this.state = {
            success: false,
        };
    }

    signUp = () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let address = document.getElementById("address").value;
        
        axios.post('https://floating-dusk-33053.herokuapp.com/api/users', { name, email, phone, address, username, password }).then(res => {
            if (res) {
                return this.setState({success: true});
            }
        })
        this.setState({success: false});
    }
    render() {
        return (
            <Modal open = { this.props.open } closeIcon onClose = { this.props.closeModal }>
                <Header content = "Sign Up"/>
                <Modal.Content scrolling>
                    <div className="signup-div">
                        <p className="signup"> Name: </p>
                        <input id="name" type="text" placeholder = "Enter your name"/>
                    </div>
                    <div className="signup-div">
                        <p className="signup"> Email: </p>
                        <input id="email" type="text" placeholder="Enter your email"/>
                    </div>
                    <div className="signup-div">
                        <p className="signup"> Phone Number: </p>
                        <input id="phone" type="text" placeholder = "Enter your phone number"/>
                    </div>
                    <div className="signup-div">
                        <p className="signup"> Address: </p>
                        <input id="address" type="text" placeholder="Enter your address"/>
                    </div>
                    <div className="signup-div">
                        <p className="signup"> Username: </p>
                        <input id="username" type="text" placeholder = "Enter username"/>
                    </div>
                    <div className="signup-div">
                        <p className="signup"> Password: </p>
                        <input id="password" type="password" placeholder="Enter password"/>
                    </div>
                    <div className="signup-button">
                        <Button color="red" onClick={ this.props.closeModal }> Cancel </Button>
                        <Button color="green" onClick={ this.signUp }> Sign Up </Button>
                    </div>
                    <p className="signin-text" onClick={ this.props.openSignIn}> Already have an account? Sign in here! </p>
                    { this.state.success && <Message success visible={this.state.success} header="Success" content="You have successfully signed up" className="success-message"/> }
                </Modal.Content>
            </Modal>
        )
    }
}



export default signup;
