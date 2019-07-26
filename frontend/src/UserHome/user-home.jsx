import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import '../adminPage/admin-homepage.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../sidebar/sidebar.jsx'
import ItemsGrid from '../items-grid.jsx'
import ItemsGridResolved from '../items-grid-2.jsx'
import firebase from "firebase/app";
import NavBar from '../nav-bar/userNavbar.jsx'
import 'firebase/auth';
import { Button, Modal, Loader } from 'semantic-ui-react';
import SubmissionForm from '../forms/submissionForm.jsx';
import FoundItemsList from '../found-item-list.jsx'
import axios from 'axios';

class UserHome extends Component {
    constructor() {
        super();

        this.state = {
            openSidebar: false,
            openOptions: false,
            items: [],
            filter: '',
            notifications: [],
            open: false,
            loading: true,
            count: 0,
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
        axios.get("http://localhost:4000/api/lostitems/?count&where={\"lostBy\":\"" + this.props.location.state.user._id + '"}').then(res => {
            this.setState({count: res.data.count});
        });
		axios.get("http://localhost:4000/api/users/" + this.props.location.state.user._id).then(res => {
			this.setState({notifications: res.data.data.notifications})
			let items = res.data.data.items;
			let i = 0
			for (i = 0; i < items.length; i++) {
			    axios.get("http://localhost:4000/api/lostitems/" + items[i]).then(res => {
					this.setState({
		    			items: [...this.state.items, res.data.data]
					})
				})
            }
        })
        if (this.state.items.length === this.state.count) {
            this.setState({loading: false})
        }
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
		
	update = () => {
		this.setState({
			items: []
		});
		axios.get("http://localhost:4000/api/users/" + this.props.location.state.user._id).then(res => {
			this.setState({notifications: res.data.data.notifications})
			let items = res.data.data.items;
			let i = 0
			for (i = 0; i < items.length; i++) {
				axios.get("http://localhost:4000/api/lostitems/" + items[i]).then(res => {
					this.setState({
						items: [...this.state.items, res.data.data]
					})
				})
			}
	    })
	}

    render() {
        let user = this.props.location.state.user;
        let lostOutput = [{
            _id: ''
        }];
        let resolvedOutput = [{
            _id: ''
        }];
        //console.log(this.state.items);
        
        if (this.state.items[1] !== undefined && this.state.items[1].id !== "") {
            lostOutput = this.state.items.filter( res => {
                return res.resolved === false;
            });
            resolvedOutput = this.state.items.filter( res => {
                return res.resolved === true;
            });
        }
        //console.log(lostOutput, resolvedOutput);
        

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
                            <ItemsGridResolved
                                user = { user }
                                title = 'Resolved'
                                items = { resolvedOutput }
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

export default UserHome;