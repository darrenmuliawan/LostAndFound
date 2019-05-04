import React, { Component } from 'react';
import './item-details.scss'
import { Modal, Header, Image } from 'semantic-ui-react'
import { isArray } from 'util';
import { Button } from 'semantic-ui-react';
import firebase from "firebase/app";

class ItemDetails extends Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedItem);
    }

    prevItem = () => {
        this.props.prevItem(this.props.selectedIndex);
    }

    nextItem = () => {
        this.props.nextItem(this.props.selectedIndex);
    }

    foundItem = (item) => {
        console.log(item.id);
            
        let db = firebase.firestore();
        let ref = db.collection('items').doc(item.id.toString());
        return ref.update({found: 1});
    }
    
    render() {
        const { selectedItem, open, selectedIndex, items } = this.props;
        let output = JSON.parse(JSON.stringify(items[selectedIndex]));
        const date = new Date(output.dateLostOrFound.seconds * 1000).toString();
        console.log(output);

        if (output !== null && typeof(output.file) !== 'undefined' && output.file !== null) {
            return (
                <Modal closeIcon onClose={this.handleClose} open={open}>
                    <Modal.Header className="modal-title"> { output.fullName } </Modal.Header>
                    <Modal.Content image scrolling className="modal-content">
                        <Modal.Description className="modal-description">
                            <p className="subcategory"> Category: </p>
                            <p className="details"> { output.category } </p>
                            <p className="subcategory"> Brand: </p>
                            <p className="details"> { output.brand } </p> 
                            <p className="subcategory"> Date: </p>
                            <p className="details"> { date } </p>
                            <p className="subcategory"> Description: </p>
                            <p className="details"> { output.description } </p>
                            <p className="subcategory"> Location: </p>
                            <p className="details"> { output.location } </p>
                            <p className="subcategory"> Images: </p>
                            { Array.from(output.file).map(img => <Image size="small" src = {img} style={{ paddingRight : '20px'}} href={img}/>) }

                            <p className="subcategory"> Contact: </p>
                            <p className="details"> Phone Number: { output.description } </p>
                            <p className="details"> Email: { output.email } </p>
                            <Button className="button-found" onClick={ () => this.foundItem(output) }> FOUND </Button>

                      </Modal.Description>
                    </Modal.Content>
                </Modal>
            )
        } else if (output !== null) {
            return (
                <Modal closeIcon onClose={this.handleClose} open={open} >
                    <Modal.Header className="modal-title"> { output.fullName } </Modal.Header>
                    <Modal.Content image scrolling className="modal-content">
                        <Modal.Description className="modal-description">
                            <p className="subcategory"> Category: </p>
                            <p className="details"> { output.category } </p>
                            <p className="subcategory"> Brand: </p>
                            <p className="details"> { output.brand } </p> 
                            <p className="subcategory"> Date: </p>
                            <p className="details"> { date } </p>
                            <p className="subcategory"> Description: </p>
                            <p className="details"> { output.description } </p>
                            <p className="subcategory"> Location: </p>
                            <p className="details"> { output.location } </p>
                            <p className="subcategory"> Contact: </p>
                            <p className="details"> Phone Number: { output.phoneNumber } </p>
                            <p className="details"> Email: { output.email } </p>
                            <Button className="button-found" onClick={ () => this.foundItem(output) }> FOUND </Button>
                            </Modal.Description>
                    </Modal.Content>
                </Modal>
            )
        }
        return (
            <Modal></Modal>
        )
    }
}

export default ItemDetails;