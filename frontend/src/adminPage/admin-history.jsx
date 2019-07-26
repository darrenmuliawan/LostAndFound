import React, { Component } from 'react';
import Navbar from '../nav-bar/userNavbar.jsx';
import { Divider, List, Modal } from 'semantic-ui-react';
import SubmissionForm from '../forms/submissionForm.jsx';
import './admin-history.scss';
import axios from 'axios';
import ItemDetails from '../item-details.jsx';

let items = [
    {
        name: 'Bose Wireless Earphone',
        lost: true,
        category: 'Electronic'
    },
    {
        name: 'Black Glasses',
        lost: false,
        category: 'Glasses'
    },
    {
        name: 'iPhone XS',
        lost: false,
        category: 'Cell Phone'
    }
]

class AdminActivities extends Component {
    constructor() {
        super();
        this.state = {
            openSubmissionForm: false,
            activities: [],
            open: false,
            selectedItem: {},
        }
    }

    componentDidMount() {
        axios.get("http://localhost:4000/api/users/" + this.props.location.state.user._id).then(res => {
            //console.log(res.data.data);
            
            this.setState({activities: res.data.data.activities})
        })
    }

    openSubmissionForm = () => {
        this.setState({
            openSubmissionForm: true,
        })
    }

    closeSubmissionForm = () => {
        this.setState({
            openSubmissionForm: false,
        })
    }

    update = () => {
        console.log("updating!");
        
        axios.get("http://localhost:4000/api/users/" + this.props.location.state.user._id).then(res => {
            console.log(res.data.data.activities);
            
            this.setState({activities: res.data.data.activities})
        })
    }

    handleClick = (item) => {
        //console.log(item);
        let item_id = item.split("#");
        let found = item.search("a Found item");
        console.log(found);
             
        let l = item_id[1].length;
        item_id[1] = item_id[1].substr(0, l - 1)

        this.setState({open: true});
        if (found >= 0) {
            axios.get('http://localhost:4000/api/founditems/' + item_id[1]).then(res => {
                this.setState({selectedItem: res.data.data});
            })
        } else {
            axios.get('http://localhost:4000/api/lostitems/' + item_id[1]).then(res => {
                this.setState({selectedItem: res.data.data});
            })
        }
    }

    handleClose = () => {
        this.setState({open: false});
    }
    render() {
        //console.log(this.state.activities);
        
        return(
            <div className="sections">
                <Navbar 
                    notifications = { this.props.location.state.notifications }
                    username = { this.props.location.state.user.name }
                    user = { this.props.location.state.user }
                    submitForm = { this.openSubmissionForm }
                />
                <div className="admin-history-content">
                    <p className="admin-history-title admin-history-text"> Recent Activities </p>
                    <Divider/>
                    <List divided verticalAlign='center' animated style={{maxHeight: 700, overflow: 'auto'}}>
                        {this.state.activities.map(i => 
                            <List.Item className="admin-history-list-item" onClick={ () => this.handleClick(i) }>
                                <List.Content >
                                    <p className="admin-history-text"> { i } </p>
                                </List.Content>
                            </List.Item>
                        )}
                    </List>
                </div>
                <Modal open = { this.state.openSubmissionForm } onClose = { this.closeSubmissionForm } closeIcon>
                    <Modal.Content scrolling>
                        <SubmissionForm user = { this.props.location.state.user } />
                    </Modal.Content>
                </Modal>
                <ItemDetails
                    selectedItem = { this.state.selectedItem }
                    open = { this.state.open }
                    onClose = { this.handleClose }
                    update = { this.update }
                    user = { this.props.location.state.user }
                />
            </div>
        )
    }
}

export default AdminActivities;