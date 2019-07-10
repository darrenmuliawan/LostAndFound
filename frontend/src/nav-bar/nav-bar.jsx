import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './nav-bar.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router'

import app from 'firebase/app';
import 'firebase/auth';

class NavBar extends Component {

	constructor() {
        super();

        this.state = {

        };
      }



	render() {
		let dashboardButton;
		let adminButton;
		if(this.props && this.props.user){
			dashboardButton = <Link to="/user">
				<p className="username">Dashboard</p>
			</Link>;
		}
		if(this.props && this.props.user && this.props.user.isAdmin){
			adminButton = <Link to={{
                pathname: "/admin",
                  state: {
                    id: this.props.user.uid,
                    name: this.props.user.displayName,
                    photoURL: this.props.user.photoURL,
                    email: this.props.user.email,
                  }
                }}> 
				<p className="username">Admin</p> 
			</Link>;
		}


        return (
				<div className="section headers">
					<div className="header-icon hidden" >
						<FontAwesomeIcon icon= {faBars} onClick = { this.openSidebar }/>
					</div>
					<div className="header-logo">
						<Link to="/">
							<p className="username">Home</p>
						</Link>
					{ dashboardButton }
					{ adminButton }
					</div>
					{ this.props.user == null ?
						<div className="header-user">
							</div>
							:
							<div className="header-user">
								<img className="avatarImg" src={this.props.user.photoURL}/>
								<p className="username"> {this.props.user.displayName} </p>
							</div>
					}
				</div>
        )
    }
}



export default NavBar;
