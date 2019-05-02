import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './home.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Button} from 'semantic-ui-react'
import Login from '../login/login.jsx'
import FirebaseContext from '../context.jsx'

import treasureMapImg from './treasure-map.png';
import foundImg from './found.png';

import app from 'firebase/app';
import 'firebase/auth';

class Home extends Component {
    constructor() {
        super();

        this.state = {
          user: {
            displayName: '',
            photoURL: '',
          },
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


    render() {
        console.log(this.state.user);
        
        return (
          <div className="sections">
              <div className="section headers">
                  <div className="header-icon">
                      <FontAwesomeIcon icon= {faBars} onClick = { this.openSidebar }/>
                  </div>
                  <div className="header-logo">
                    { this.state.user == null ? 
                        <p className="logo"> Lost and Found </p> 
                        :
                        <Link to={{
                          pathname: "/admin",
                          state: {
                            id: this.state.user.uid,
                            name: this.state.user.displayName,
                            photoURL: this.state.user.photoURL,
                            email: this.state.user.email,
                          }
                        }}>
                          <p className="logo"> Lost and Found </p>
                        </Link>
                    }
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

              <div className="section content-wrapper">
              <div>
                <h1>Lost and Found</h1>
                <div className="horizontal">
                  <div>
                    <h3>Found Something</h3>
                  </div>
                  <div>
                    <h3>Lost Something </h3>
                  </div>
                </div>
                <div className="horizontal">
                  <div>
                    <img src={foundImg}/>
                  </div>
                  <div>
                    <img src={treasureMapImg}/>
                  </div>
                </div>
                <div className="horizontal">
                    <p>Describe the item that you found and where you found it and we will find the owner</p>
                    <p>Tell us what you lost and we will tell you when soemone finds it</p>

                </div>

              <Login/>
              </div>



              </div>

            </div>
        )
    }
}



export default Home;
