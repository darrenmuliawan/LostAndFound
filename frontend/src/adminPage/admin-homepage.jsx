import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './admin-homepage.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../sidebar/sidebar.jsx'
import ItemsGrid from '../items-grid.jsx'
import ItemsGridFound from '../items-grid-2.jsx'
import firebase from "firebase/app";
import NavBar from '../nav-bar/userNavbar.jsx'
import 'firebase/auth';
import { Button, Modal, Input, Loader } from 'semantic-ui-react';
import SubmissionForm from '../forms/submissionForm.jsx';
import FoundItemsList from '../found-item-list.jsx'
import axios from 'axios';

class AdminHome extends Component {
    constructor() {
        super();

        this.state = {
            openSidebar: false,
            openOptions: false,
            items: [],
            lostItems: [],
            foundItems: [],
            filter: '',
            notifications: [],
            open: false,
            loading: true,
        }
    }

    openSubmissionForm = () => {
        this.setState({
            open: true,
        });
    }

    closeSubmissionForm = () => {
        this.setState({
            open: false,
        });
    }

    componentDidMount() {
        axios.get('http://ec2-18-219-2-58.us-east-2.compute.amazonaws.com:4000/api/lostitems').then(res => {
            this.setState({
                lostItems: res.data.data,
            });
        }).then(
            axios.get('http://ec2-18-219-2-58.us-east-2.compute.amazonaws.com:4000/api/founditems').then(res => {
                this.setState({
                    foundItems: res.data.data,
                });
            })
        ).then(
            axios.get('http://ec2-18-219-2-58.us-east-2.compute.amazonaws.com:4000/api/users/' + this.props.location.state.user._id).then(res => {
                this.setState({
                    notifications: res.data.data.notifications,
                })
            })
        ).then(
            this.setState({
                loading: false,
            })
        )
        this.setState({
            items: this.props.location.state.user.items
        });
    }

    update = () => {
        axios.get('http://ec2-18-219-2-58.us-east-2.compute.amazonaws.com:4000/api/lostitems').then(res => {
            this.setState({
                lostItems: res.data.data,
            });
        });
    
        axios.get('http://ec2-18-219-2-58.us-east-2.compute.amazonaws.com:4000/api/founditems').then(res => {
            this.setState({
                foundItems: res.data.data,
            });
        });
    }


    openSidebar = () => {
        this.setState({
            openSidebar: !this.state.openSidebar
        })
    }

    handleHide = () => {
        this.setState({
            openSidebar: false,
        })
    }

    applyFilter = (filter) => {
        this.setState({
            filter: filter
        })
    }

    openOptions = () => {
        this.setState({
            openOptions: !this.state.openOptions,
        });
    }

    render() {
        console.log(this.state.lostItems);
        console.log(this.state.foundItems);
        console.log(this.state.notifications);

        let lostOutput = this.state.lostItems;
        let foundOutput = this.state.foundItems;
        let user = this.props.location.state.user;
        
        lostOutput = lostOutput.filter( res => {
            return res.resolved === false;
        });

        console.log(lostOutput);
        
        foundOutput = foundOutput.filter( res => {
            return res.resolved === false;
        });

        return (
            <div className="sections">
                { this.state.loading === true ? 
                    <Loader active inline='centered'/> 
                    :
                    <div>
                    <NavBar
                        open = { this.openOptions }
                        openSidebar = { this.openSidebar }
                        username = {user.name}
                        sidebar = { this.state.openSidebar }
                        submitForm = { this.openSubmissionForm }
                        notifications = { this.state.notifications }
                        user = { user }
                    />

                    <Sidebar
                        filter = { this.applyFilter }
                        visible = { this.state.openSidebar }
                        handleHide = { this.handleHide }
                    />

                    <div className="title">
                        <p className="title-homepage"> Welcome back, {user.name}! </p>
                    </div>

                    <Modal open = { this.state.open } onClose = { this.closeSubmissionForm } closeIcon>
                        <Modal.Content scrolling>
                            <SubmissionForm user = { user } update={this.update}/>
                        </Modal.Content>
                    </Modal>
                    <div className="section items">
                        <ItemsGrid
                            user = { user }
                            title = 'Lost'
                            items = { lostOutput }
                            filter = { this.state.filter }
                            update = { this.update }
                        />
                    </div>
                    <div className="section items">
                        <ItemsGridFound
                            user = { user }
                            title = 'Found'
                            items = { foundOutput }
                            filter = { this.state.filter }
                            update = { this.update }
                        />
                    </div>
                    </div>
                }
            </div>
        )
    }
}



export default AdminHome;
