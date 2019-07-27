import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './navbar.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Icon } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDove } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router'

import app from 'firebase/app';
import 'firebase/auth';

class NavBar extends Component {
    
    openLoginPage = () => {
        this.props.open();
    }

    render() {
        return (
            <div className="section headers2">
                <div className="header-logo">
                    <Icon name="bird"/>
                </div>

                <div className="header-title">
                    <p> Lost and Found </p>
                </div>
                
                <div className="header-login">
                    <p onClick = { this.openLoginPage }> Login </p>
                </div>
            </div>
        )
    }
}



export default NavBar;