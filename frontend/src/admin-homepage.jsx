import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import './admin-homepage.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Sidebar from './sidebar.jsx'
import ItemsGrid from './items-grid.jsx'
import firebase from "firebase/app";

let MAX_PAGE = 0;

class AdminHome extends Component {
    constructor() {
        super();

        this.state = {
            visible: false,
            visible2: false,
            items: [{
                index: 0,
                brand: '',
                category: '',
                dateLostOrFound: '',
                description: '',
                email: '',
                fullName: '',
                location: '',
                lostOrFound: '',
                phoneNumber: '',
                file: null,
            }],
            page: 0,
            filter: []
        }
    }

    componentDidMount() {
        let db = firebase.firestore();
        let index = 0;

        db.collection("items")
        .get()
        .then((item) => {            
            item.forEach((i) => {
                if (i.data().found == 0) {
                    console.log(i);
                    
                    console.log(i.data());
                    
                    let copy = i.data();
                    copy.index = index;
                    //i.data().index = index;
                    this.setState(prevState => ({
                        items: [...prevState.items, copy]
                    }));
                    index++;
                    MAX_PAGE = Math.ceil(index / 16);
                }  
            })
        })
    }

    openSidebar = () => { 
        
        if (this.state.visible2 == false && this.state.visible == true) {
            this.setState({
                visible: true,
                visible2: true
            })
        } else {
            this.setState({
                visible: !this.state.visible,
                visible2: !this.state.visible2
            })
        }
    }

    handleHide = () => {
        this.setState({
            visible2: !this.state.visible2
        })
    }

    closeSidebar = () => {        
        this.setState({
            visible: false
        })
    }

    applyFilter = (filter) => {
        if (this.state.filter.length !== filter.length) {
            this.setState({
                filter: filter
            })
        }
    }

    prevPage = () => {
        if (this.state.page > 0) {
            this.setState(prevState => ({
                page: prevState.page - 1,
            }))
        }
    }

    nextPage = () => {
        if (this.state.page == MAX_PAGE - 1) {
            this.setState({
                page: 0,
            })
        } else {
            this.setState(prevState => ({
                page: prevState.page + 1,
            }))
        }
    }
    
    render() {
        let i;
        let output = this.state.items;

        output = output.filter( res => {
            return res.brand !== "";
        });

        if (output.length > 16) {
            output = output.slice(0 + (this.state.page * 16), 16 + (this.state.page * 16));
        }
        console.log(this.state.items);
                
        return (
            <div className="sections">
                <div className="section headers">
                    <div className="header-icon">
                        <FontAwesomeIcon icon= {faBars} onClick = { this.openSidebar }/>
                    </div>
                    <div className="header-logo">
                        <p className="logo"> Lost and Found </p>
                    </div>
                        
                    <div className="header-user">
                        <Link to={{
                            pathname: "/admin/adminusername",
                            state: {
                                id: this.props.location.state.id,
                                name: this.props.location.state.name,
                                photoURL: this.props.location.state.photoURL,
                                email: this.props.location.state.email,
                            }
                        }}>
                            <img className="avatarImg" src={this.props.location.state.photoURL}/>
                        </Link>
                        <Link to={{
                            pathname: "/admin/adminusername",
                            state: {
                                id: this.props.location.state.id,
                                name: this.props.location.state.name,
                                photoURL: this.props.location.state.photoURL,
                                email: this.props.location.state.email,
                            }
                        }}>
                            <p className="username"> {this.props.location.state.name} </p>
                        </Link>
                    </div>
              </div>
                
                <Sidebar
                    filter = { this.applyFilter }
                    visible = { this.state.visible }
                    visible2 = { this.state.visible2 }
                    onHide = { this.handleHide }
                />
                

                <div className="section items">
                    <ItemsGrid
                        items = { output }
                        allItems = { this.state.items }
                        filter = { this.state.filter }
                    />
                </div>
                <a className="prev" onClick={this.prevPage}> &#10094; </a>
                <a className="next" onClick={this.nextPage}> &#10095; </a>
            </div>
        )
    }
}



export default AdminHome;