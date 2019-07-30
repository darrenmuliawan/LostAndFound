import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import Profile from '../checkProfile.jsx'
import axios from 'axios';
import './userNavbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faCaretSquareDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, Button, Menu, Icon, DropdownHeader } from 'semantic-ui-react'
import ItemDetails from '../item-details.jsx';

class UserNavbar extends Component {
    constructor() {
        super();
        this.routeChange = this.routeChange.bind(this);

        this.state = {
            current: '',
            openProfile: false,
            openItems: false,
            selectedItem: {},
            user: {
                name: '',
                address: '',
                admin: false,
                email: '',
                phone: '',
            },
            notifications: []
        }
    }

    componentDidMount() {
        console.log(this.props);
        axios.get("https://floating-dusk-33053.herokuapp.com/api/users/" + this.props.location.state.user._id).then(res => {
            console.log(res);
            
            this.setState({
                notifications: res.data.data.notifications,
            })
        })
    }

    openProfile = (item) => {
        if (item === "There is no notifications") {
            return;
        }
        console.log(item);
        let user_id = item.split('(');
        user_id[1] = user_id[1].substring(0, user_id[1].length - 1);
        //console.log(user_id[1]);
        if (user_id[1][0] !== '#') {
            axios.get("https://floating-dusk-33053.herokuapp.com/api/users/" + user_id[1]).then(res => {
                this.setState({ 
                    openProfile: true,
                    user: res.data.data
                })
            })
        } else {
            let item_id = user_id[1].substring(1, user_id[1].length);
            axios.get("https://floating-dusk-33053.herokuapp.com/api/lostitems/" + item_id).then(res => {
                console.log(res.data.data);
                
                this.setState({
                    openItems: true,
                    selectedItem: res.data.data
                })
            })
        }
    }

    closeProfile = () => {
        this.setState({
            openProfile: false,
        })
    }

    handleClose = () => {
        this.setState({
            openItems: false,
        })
    }

    routeChange = (selected, newPath) => {
        //let path = newPath;
        this.setState({
            current: selected,
        })
        this.props.history.push(newPath, {notifications: this.props.notifications, user: this.props.user, current: selected});
    }

    update = () => {
        console.log('a');
        
    }

    updateNotifications = () => {
        this.setState({
            notifications: [],
        })
    }

    clearNotifications = () => {
        //console.log("CLEAR NOTIFICATIONS");
        
        axios.put("https://floating-dusk-33053.herokuapp.com/api/users/" + this.props.user._id + "/clearNotifications", {}).then(res => {
            if (res.status === 200) {
                this.updateNotifications()
            }
        })
    }

    render() {
        let notifications = this.state.notifications;
        //console.log(this.props.user.admin);
        console.log(notifications.length, notifications);
        
        if (notifications.length === 0) {
            notifications[0] = "There is no notifications";
        }

        return (
            <div className="section headers3">
                <div className="header-logo">
                    <Button icon disabled = { this.props.sidebar } className="filter-btn"> <Icon name='bars' onClick = {this.props.openSidebar} /> </Button>
                </div>

                <div className="header-title">
                    { this.props.user.admin === true ? 
                        <p className="header-home-button" onClick={() => this.routeChange('', '/' + this.props.user._id + '/a')}> Home </p>
                        :
                        <p className="header-home-button" onClick={() => this.routeChange('', '/' + this.props.user._id + '/u')}> Home </p>
                    }
                </div>
                
                <div className="header-user-admin">
                    <div className="header-notification">
                        <Dropdown
                            icon="bell"
                            floating
                            className="notif-btn"
                        >
                            <Dropdown.Menu direction='left' className="dropdown-menu-1">
                                <Dropdown.Header content="Notifications" />
                                <Dropdown.Menu scrolling id="menu-1">
                                    {notifications.map(notif => (
                                        <Dropdown.Item text={notif} className="notification-items" onClick= {() =>  this.openProfile(notif) } />
                                    ))}
                                </Dropdown.Menu>
                                <Dropdown.Header icon="trash" content="Clear Notifications" className="notification-items" onClick={() => this.clearNotifications()}/>
                            </Dropdown.Menu>
                            
                        </Dropdown>
                    </div>
                    <div className="header-username">
                        { this.props.user.admin === true ? 
                            <Dropdown text={this.props.username} floating>
                                <Dropdown.Menu>
                                    <Dropdown.Item icon='wpforms' text='Submit new form' className="header-user-menu" onClick={this.props.submitForm}/>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item icon='user' disabled= {this.props.location.pathname === '/' + this.props.user._id + '/profile'} text='Profile' className="header-user-menu" onClick={() => this.routeChange('Profile','/' + this.props.user._id + '/profile')}/>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item icon='history' disabled= {this.props.location.pathname === '/' + this.props.user._id + '/history'} text='Activities' className="header-user-menu" onClick={() => this.routeChange('History','/' + this.props.user._id + '/history')}/>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item icon='line graph' disabled= {this.props.location.pathname === '/' + this.props.user._id + '/a/analytics'} text='Analytics' className="header-user-menu" onClick={() => this.routeChange('Analytics', '/' + this.props.user._id + '/a/analytics')}/>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item icon='power off' text='Sign Out' className="header-user-menu" onClick={() => this.routeChange('', '/')}/>
                                </Dropdown.Menu>
                            </Dropdown>
                        :
                            <Dropdown text={this.props.username} floating>
                                <Dropdown.Menu>
                                    <Dropdown.Item icon='wpforms' text='Submit new form' className="header-user-menu" onClick={this.props.submitForm}/>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item icon='user' disabled= {this.props.location.pathname === '/' + this.props.user._id + '/profile'} text='Profile' className="header-user-menu" onClick={() => this.routeChange('Profile','/' + this.props.user._id + '/profile')}/>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item icon='history' disabled= {this.props.location.pathname === '/' + this.props.user._id + '/history'} text='Activities' className="header-user-menu" onClick={() => this.routeChange('History','/' + this.props.user._id + '/history')}/>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item icon='power off' text='Sign Out' className="header-user-menu" onClick={() => this.routeChange('', '/')}/>
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                            
                    </div>
                </div>
                <Profile 
                    user = { this.state.user }
                    open = { this.state.openProfile }
                    closeModal = { this.closeProfile }
                />
                <ItemDetails
                    selectedItem = { this.state.selectedItem }
                    open = { this.state.openItems }
                    onClose = { this.handleClose }
                    user = { this.props.user }
                    update = { this.update }
                />
            </div>
        )
    }
}

export default withRouter(UserNavbar);