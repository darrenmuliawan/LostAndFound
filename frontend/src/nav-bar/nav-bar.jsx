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
					adminButton = <Link to="/admin"> <p className="username">Admin</p> </Link>;
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
								{ this.props.user == null ?
										<div className="header-user">
											<Link to="/admin/adminusername">
													<FontAwesomeIcon icon= {faUserCircle}/>
											</Link>
											<Link to="/admin/adminusername">
													<p className="username"> null </p>
											</Link>
										</div>
										:
										<div className="header-user">
											<Link to="/admin/adminusername">
												<img className="avatarImg" src={this.props.user.photoURL}/>
											</Link>
											<Link to="/admin/adminusername">
													<p className="username"> {this.props.user.displayName} </p>
											</Link>
										</div>
									}
					</div>
        )
    }
}



export default NavBar;
