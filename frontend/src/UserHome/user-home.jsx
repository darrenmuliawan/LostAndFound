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
import { Redirect } from 'react-router'

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase';

class UserHome extends Component {

	constructor() {
        super();

        this.state = {
          user: null,
          lostItems: [],
          foundItems: []
        };

        this.auth = app.auth();

      }

    componentDidMount() {
		this.auth.onAuthStateChanged(user => {
			user ? this.setState({ user }) : this.setState({ user: null });
			let db = firebase.firestore();
		    let index = 0;
		    db.collection("items")
		    .where("email", "==", user.email)
		    .where("lostOrFound", "==", "lost")
		    .get()
		    .then((item) => {
		    	let lostItems = [];
		        item.forEach((i) => {
		            let copy = i.data();
		            lostItems.push(copy);
		        })
		        if( this.state.lostItems.length != lostItems.length) {
		        	this.setState({lostItems: lostItems});
				}
		    })

		    db.collection("items")
		    .where("email", "==", user.email)
		    .where("lostOrFound", "==", "found")
		    .get()
		    .then((item) => {
		    	let foundItems = [];
		        item.forEach((i) => {
		            let copy = i.data();
		            foundItems.push(copy);
		        })
		        if( this.state.foundItems.length != foundItems.length) {
		        	this.setState({foundItems: foundItems});
				}
		    })
		    console.log(user.email);
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
		let dummyItemNames = [{name: "Textbook"}, {name: "Laptop"}, {name: "iPhone"}, {name: "Keys"}, 
							  {name: "Notebook"}, {name: "Dog"}, {name: "Grandma"}, {name: "My GPA"}]

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
             		<div className="items lost">
             			<h2>Lost Items</h2>
	                	<ScrollView ref={scroller => this._scroller = scroller}>
				          <div className="scroller">
				           	{ this.state.lostItems.length ?
					            this.state.lostItems.map(({ brand, description }) => {
					              return (
					                <ScrollElement>
					                  <div className="item">
					                    {brand} - {description}
					                  </div>
					                </ScrollElement>
					              );
				            	})
					            :
					            <span>0 items found!</span>
				            }
				          </div>
				        </ScrollView>
				    </div>

				    <div className="items found">
				        <h2>Found Items</h2>

				        <ScrollView ref={scroller => this._scroller = scroller}>
				          <div className="scroller">
				            { this.state.foundItems.length ?
				            	this.state.foundItems.map(({ name }) => {
					              return (
					                <ScrollElement name={name}>
					                  <div className="item">
					                    {name}
					                  </div>
					                </ScrollElement>
					              );
					            })
				            	:
				            	<span>0 Items found!</span>
				            }
				          </div>
				        </ScrollView>
			        </div>
                </div>
            </div>
        )
    }
}



export default UserHome;