import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import './userNavbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faCaretSquareDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, Button, Menu, Icon } from 'semantic-ui-react'

class UserNavbar extends Component {
    constructor() {
        super();
        this.routeChange = this.routeChange.bind(this);

        this.state = {
            current: '',
        }
    }

    routeChange = (selected, newPath) => {
        //let path = newPath;
        this.setState({
            current: selected,
        })
        this.props.history.push(newPath, {notifications: this.props.notifications, user: this.props.user, current: selected});
    }

    render() {
        let notifications = this.props.notifications;
        console.log(this.props);
        
        if (notifications.length === 0) {
            notifications[0] = "There is no notifications";
        }

        return (
            <div className="section headers3">
                <div className="header-logo">
                    <Button icon disabled = { this.props.sidebar } className="filter-btn"> <Icon name='bars' onClick = {this.props.openSidebar} /> </Button>
                </div>

                <div className="header-title">
                    <p className="header-home-button" onClick={() => this.routeChange('', '/admin')}> Home </p>
                </div>
                
                <div className="header-user-admin">
                    <div className="header-notification">
                        <Dropdown
                            icon="bell"
                            floating
                            className="notif-btn"
                        >
                            <Dropdown.Menu >
                                {notifications.map(notif => (
                                    <Dropdown.Item text={notif} className="notification-items"/>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="header-username">
                        <Dropdown text={this.props.username} floating>
                            <Dropdown.Menu>
                                <Dropdown.Item icon='wpforms' text='Submit new form' className="header-user-menu" onClick={this.props.submitForm}/>
                                <Dropdown.Divider/>
                                <Dropdown.Item icon='user' disabled= {this.props.location.pathname === '/admin/profile'} text='Profile' className="header-user-menu" onClick={() => this.routeChange('Profile','/admin/profile')}/>
                                <Dropdown.Divider/>
                                <Dropdown.Item icon='history' disabled= {this.props.location.pathname === '/admin/history'} text='Activities' className="header-user-menu" onClick={() => this.routeChange('History','/admin/history')}/>
                                <Dropdown.Divider/>
                                <Dropdown.Item icon='line graph' disabled= {this.props.location.pathname === '/admin/analytics'} text='Analytics' className="header-user-menu" onClick={() => this.routeChange('Analytics', '/admin/analytics')}/>
                                <Dropdown.Divider/>
                                <Dropdown.Item icon='power off' text='Sign Out' className="header-user-menu" onClick={() => this.routeChange('', '/')}/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserNavbar);