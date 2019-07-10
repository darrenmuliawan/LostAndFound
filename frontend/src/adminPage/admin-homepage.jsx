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
import firebase from "firebase/app";
import NavBar from '../nav-bar/userNavbar.jsx'
import 'firebase/auth';
import { Button, Modal } from 'semantic-ui-react';
import SubmissionForm from '../SubmissionForm/SubmissionForm.jsx'
import FoundItemsList from '../found-item-list.jsx'

let MAX_ITEM_FOUND = 0;
let MAX_ITEM_LOST = 0;

class AdminHome extends Component {
    constructor() {
        super();

        this.auth = firebase.auth();

        this.state = {
            openSidebar: false,
            openOptions: false,
            items: [{
                id: '',
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
            foundItems: [{
                id: '',
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
            filter: [],
            notifications: [],
            open: false,
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
        let db = firebase.firestore();
        let index = 0;
        let index2 = 0;
        this.auth.onAuthStateChanged(user => {
          if(user){
            this.setState({ user }) ;
            let db = firebase.firestore();
            db.collection("userRoles")
             .doc(user.uid)
             .get()
             .then((item) => {
               let data = item.data();
               if(data && data.isAdmin == true){
                 user.isAdmin = data.isAdmin;
                 this.setState({ user }) ;
                 db.collection("items")
                 .get()
                 .then((item) => {
                     item.forEach((i) => {
                         if (i.data().found == 0 && i.data().lostOrFound == "lost") {
                             let copy = i.data();
                             copy.index = index;
                             copy.id = i.id;
                             this.setState(prevState => ({
                                 items: [...prevState.items, copy],
                             }));
                             index++;
                             MAX_ITEM_LOST = index;
                         } else if (i.data().found === 0 && i.data().lostOrFound === "found") {
                            let copy = i.data();
                            copy.index = index2;
                            copy.id = i.id;
                            this.setState(prevState => ({
                                foundItems: [...prevState.foundItems, copy],
                            }));
                            index2++;
                         }
                     })
                 })
               }else{
                   console.log(this.props);
                   
                 this.props.history.push('/');
               }
               console.log(user);
             })
          }else{
             this.setState({ user: null });
          }
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
        if (this.state.filter.length !== filter.length) {
            this.setState({
                filter: filter
            })
        }
    }

    openOptions = () => {
        
        this.setState({
            openOptions: !this.state.openOptions,
        });
    }

    render() {
        let i;
        let output = this.state.items;
        let foundOutput = this.state.foundItems;
        let user = {
            username: 'darrenmuliawan',
            password: 'rahasia',
            name: 'Darren A Muliawan',
            email: 'darrenalexandermuliawan@gmail.com',
            address: '504 Citadelle Ln, San Jose, CA 95116',
            phone: '(424) 386-8322',
            joined: 'June 1, 2019',
        }
        console.log(this.state.openSidebar);
        
        output = output.filter( res => {
            return res.brand !== "";
        });

        foundOutput = foundOutput.filter( res => {
            return res.brand !== "";
        });

        //console.log(this.state.items);

        let dashboardButton;
        let adminButton;
        if(this.state && this.state.user){
          dashboardButton = <Link to="/user">
                                <p className="username">Dashboard</p>
                            </Link>;
        }
        if(this.state.user && this.state.user.isAdmin){
          adminButton = <Link to={{
                          pathname: "/admin",
                          state: {
                            id: this.state.user.uid,
                            name: this.state.user.displayName,
                            photoURL: this.state.user.photoURL,
                            email: this.state.user.email,
                          }
                        }}> <p className="username">Admin</p> </Link>;
        }

        return (
            <div className="sections">
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
                        <SubmissionForm/>
                    </Modal.Content>
                </Modal>
                <div className="section items">
                    <ItemsGrid
                        items = { output }
                        allItems = { this.state.items }
                        filter = { this.state.filter }
                    />
                </div>
                <div className="section items">
                    <FoundItemsList
                        items = { foundOutput }
                        allItems = { this.state.foundItems }
                        filter = { this.state.filter }
                    />
                </div>
            </div>
        )
    }
}



export default AdminHome;
