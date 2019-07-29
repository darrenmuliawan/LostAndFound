import React, { Component } from 'react';
import './item-details.scss'
import { Modal, Header, Image, Input } from 'semantic-ui-react'
import { isArray } from 'util';
import { Button } from 'semantic-ui-react';
import Profile from './checkProfile.jsx';
import firebase from "firebase/app";
import axios from 'axios';

class ItemDetails extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                name: '',
                email: '',
                phone: '',
            },
            open: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedItem._id !== prevProps.selectedItem._id) {
            if (this.props.selectedItem.lostBy) {
                axios.get('https://floating-dusk-33053.herokuapp.com/api/users/' + this.props.selectedItem.lostBy).then(res => {
                    //console.log("halo");
                    this.setState({
                        user: res.data.data
                    })
                })
            } else {
                axios.get('https://floating-dusk-33053.herokuapp.com/api/users/' + this.props.selectedItem.foundBy).then(res => {
                    //console.log("halo");
                    this.setState({
                        user: res.data.data
                    })
                })
            }
        }
    }

    handleClose = () => {
        this.props.onClose(this.props.selectedItem);
    }

    prevItem = () => {
        this.props.prevItem(this.props.selectedIndex);
    }

    nextItem = () => {
        this.props.nextItem(this.props.selectedIndex);
    }

    openProfile = () => {
        this.setState({
            open: true,
        })
    }

    closeProfile = () => {
        this.setState({
            open: false,
        })
    }

    resolve = (item) => {
        //console.log(item._id);
        let resolved = true;
        let lostBy = item.lostBy;
        let foundBy = item.foundBy;
        //console.log(lostBy, foundBy);
        
        if (item.lostBy !== undefined) {
            axios.put("https://floating-dusk-33053.herokuapp.com/api/lostitems/" + item._id, { lostBy, resolved }).then(res => {
                console.log(res);
                if (res.status === 200) {
                    let activity = "You resolved a Lost item: " + res.data.data.brand + ' ' + res.data.data.model + " (Item ID #" + item._id + ")";
                    axios.put("https://floating-dusk-33053.herokuapp.com/api/users/" + this.props.user._id, { activity })
                    let notification = "Your Lost " + item.brand + ' ' + item.model + ' '+ ' has been resolved by ' + this.props.user.name + ' (' + this.props.user._id + ')';
                    axios.put("https://floating-dusk-33053.herokuapp.com/api/users/" + lostBy, { notification })
                }
            }).then(res => {
                this.props.update();
            })
        } else if (item.lostBy === undefined) {
            axios.put("https://floating-dusk-33053.herokuapp.com/api/founditems/" + item._id, { foundBy, resolved }).then(res => {
                console.log(res);
                if (res.status === 200) {
                    let activity = "You resolved a Found item: " + res.data.data.brand + ' ' + res.data.data.model + " (Item ID #" + item._id + ")";
                    axios.put("https://floating-dusk-33053.herokuapp.com/api/users/" + this.props.user._id, { activity })
                }
            }).then(res => {
                this.props.update();
            })
        }
    }
    
    render() {
        //console.log(this.props);
    
        const { selectedItem, open, selectedIndex, items } = this.props;
        let date = new Date(selectedItem.date);

        
        if (Object.keys(selectedItem).length > 0) {
            return (
                <Modal closeIcon onClose={this.handleClose} open={open} >
                    <Modal.Header className="modal-title"> { selectedItem.brand + ' ' + selectedItem.model } </Modal.Header>
                    <Modal.Content image scrolling className="modal-content">
                        <Modal.Description className="modal-description">
                            <p className="subcategory"> Category: </p>
                            <p className="details"> { selectedItem.category } </p>
                            <p className="subcategory"> Brand: </p>
                            <p className="details"> { selectedItem.brand } </p> 
                            <p className="subcategory"> Date: </p>
                            <p className="details"> { date.toLocaleDateString() } </p>
                            <p className="subcategory"> Description: </p>
                            <p className="details"> { selectedItem.description } </p>
                            <p className="subcategory"> Location: </p>
                            <p className="details"> { selectedItem.location } </p>
                            <p className="subcategory"> Images: </p>
                            { selectedItem.images.length === 0 ? <p className="details"> None </p> : selectedItem.images.map(img => <Image size="small" src = {img} style={{ paddingRight : '20px'}} href={img}/>) }
                            <p className="subcategory"> Contact: </p>
                            <p className="details name-details" onClick={ this.openProfile }> Name: { this.state.user.name} </p>
                            <p className="details"> Phone Number: { this.state.user.phone } </p>
                            <p className="details"> Email: { this.state.user.email } </p>
                            {this.props.user.admin === true ? 
                                <Button disabled={selectedItem.resolved} color="green" inverted className="button-found" onClick={ () => this.resolve(selectedItem) }> Mark as resolved </Button>
                                :
                                <div></div>
                            }
                        </Modal.Description>
                    </Modal.Content>
                    <Profile 
                        open = { this.state.open }
                        closeModal = { this.closeProfile }
                        user = { this.state.user }
                    />
                </Modal>
            )
        } else {
            return (
                <Modal></Modal>
            )
        }
    }
}

export default ItemDetails;