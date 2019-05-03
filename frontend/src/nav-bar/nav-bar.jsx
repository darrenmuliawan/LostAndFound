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
				let adminButton;
				if(this.props && this.props.user && this.props.user.isAdmin){
					console.log("ADMIN", this.props.user.isAdmin);
					adminButton = <Link to={{
                          pathname: "/admin",
                          state: {
                            id: this.props.user.uid,
                            name: this.props.user.displayName,
                            photoURL: this.props.user.photoURL,
                            email: this.props.user.email,
                          }
                        }}> <p className="username">Admin</p> </Link>;
				}

        return (
					<div className="section headers">
							<div className="header-icon">
									<FontAwesomeIcon icon= {faBars} onClick = { this.openSidebar }/>
							</div>
							<div className="header-logo">
								<Link to="/">
										<p className="username">Home</p>
								</Link>
								<Link to="/user">
										<p className="username">Dashboard</p>
								</Link>
								{ adminButton	}
							</div>
							{ this.state.user == null ?
										 <div className="header-user">
										 </div>
										 :
										 <div className="header-user">
											 <Link to={{
												 pathname: "/admin/adminusername",
												 state: {
													 id: this.state.user.uid,
													 name: this.state.user.displayName,
													 photoURL: this.state.user.photoURL,
													 email: this.state.user.email,
												 }
											 }}>
												 <img className="avatarImg" src={this.state.user.photoURL}/>
											 </Link>
											 <Link to={{
												 pathname: "/admin/adminusername",
												 state: {
													 id: this.state.user.uid,
													 name: this.state.user.displayName,
													 photoURL: this.state.user.photoURL,
													 email: this.state.user.email,
												 }
											 }}>
													 <p className="username"> {this.state.user.displayName} </p>
											 </Link>
										 </div>
									 }
					</div>
        )
    }
}



export default NavBar;
