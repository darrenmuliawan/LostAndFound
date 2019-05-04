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
import NavBar from './nav-bar/nav-bar.jsx'
import 'firebase/auth';
import { Button, Modal } from 'semantic-ui-react';
import SubmissionForm from './SubmissionForm/SubmissionForm.jsx'
import FoundItemsList from './found-item-list.jsx'

let MAX_ITEM_FOUND = 0;
let MAX_ITEM_LOST = 0;

class AdminHome extends Component {
    constructor() {
        super();

        this.auth = firebase.auth();

        this.state = {
            visible: false,
            visible2: false,
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

    render() {
        let i;
        let output = this.state.items;
        let foundOutput = this.state.foundItems;

        output = output.filter( res => {
            return res.brand !== "";
        });

        foundOutput = foundOutput.filter( res => {
            return res.brand !== "";
        });

        console.log(this.state.items);

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
              	<div className="section headers">
              			<div className="header-icon" >
              				<FontAwesomeIcon icon= {faBars} onClick = { this.openSidebar }/>
              			</div>
              			<div className="header-logo">
              				<Link to="/">
              					<p className="username">Home</p>
              				</Link>
              				{ dashboardButton	}
              				{ adminButton	}
              			</div>
              			{ this.state.user == null ?
              				<div className="header-user">
              					</div>
              					:
              					<div className="header-user">
                                    <img className="avatarImg" src={this.state.user.photoURL}/>
              						<p className="username"> {this.state.user.displayName} </p>
              					</div>
              			}
              	</div>

                <Sidebar
                    filter = { this.applyFilter }
                    visible = { this.state.visible }
                    visible2 = { this.state.visible2 }
                    onHide = { this.handleHide }
                />
                <div className="title">
                    <p className="list-title"> Did you Lost/Found an item today? </p>
                    <Button className="submit-button" onClick={ this.openSubmissionForm }> Submit Form </Button>
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
