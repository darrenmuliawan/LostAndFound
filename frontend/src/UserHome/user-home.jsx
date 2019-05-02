import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './user-home.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Button} from 'semantic-ui-react'
import Login from '../login/login.jsx'
import FirebaseContext from '../context.jsx'
import ScrollView, { ScrollElement } from "./scroll.jsx";

import app from 'firebase/app';
import 'firebase/auth';

class UserHome extends Component {

	constructor() {
        super();

        this.state = {
          user: null,
        };

        this.auth = app.auth();

      }

    componentDidMount() {
      this.auth.onAuthStateChanged(user => {
        user
          ? this.setState({ user })
          : this.setState({ user: null });
      });
    }

    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
    }

    scrollTo(name) {
    	this._scroller.scrollTo(name);
  	}

	render() {

		let dummyItemNames = [{name: "Textbook"}, {name: "Laptop"}, {name: "iPhone"}, {name: "Keys"}, {name: "Notebook"}, {name: "Dog"}, {name: "Grandma"}, {name: "My GPA"}]

        return (
            <div className="sections">
                <div className="section headers">
					<div className="header-icon">
					  <FontAwesomeIcon icon= {faBars} onClick = { this.openSidebar }/>
					</div>
					<div className="header-logo">
					  <p className="logo"> Lost and Found </p>
					</div>
                    { this.state.user == null ?
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
                            <img className="avatarImg" src={this.state.user.photoURL}/>
                          </Link>
                          <Link to="/admin/adminusername">
                              <p className="username"> {this.state.user.displayName} </p>
                          </Link>
                        </div>
                     }
              	</div>
                
                <div className="section content-wrapper">
                	<ScrollView ref={scroller => this._scroller = scroller}>
			          <div className="scroller">
			            {dummyItemNames.map(({ name }) => {
			              return (
			                <ScrollElement name={name}>
			                  <div className="item">
			                    {name}
			                  </div>
			                </ScrollElement>
			              );
			            })}
			          </div>
			        </ScrollView>
                </div>
            </div>
        )
    }
}



export default UserHome;