import React, { Component } from 'react';
import './item-details.scss'
import { Modal, Header, Image } from 'semantic-ui-react'
import { isArray } from 'util';
import { Button } from 'semantic-ui-react';

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


    render() {
        const { selectedItem, open, selectedIndex, items } = this.props;
        let output = JSON.parse(JSON.stringify(items[selectedIndex]));
        //console.log(output.dateLostOrFound.seconds);
        //const date = new Date(output.dateLostOrFound.seconds * 1000).toISOString().substr(11,8);
        const date = new Date(output.dateLostOrFound.seconds * 1000).toString();
        console.log(date);
        //const date = 0;

        if (output !== null && typeof(output.imageUrl) !== 'undefined') {
            return (
                <Modal onClose={this.handleClose} open={open}>
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
                            { output.imageUrl.map(img => <Image size="small" src = {img} style={{ marginBottom: '50px'}} href={img}/>) }
                            <p className="subcategory"> Contact: </p>
                            <p className="details"> Phone Number: { output.description } </p>
                            <p className="details"> Email: { output.email } </p>
                            <Button className="button-found"> FOUND </Button>

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
                            <Button className="button-found"> FOUND </Button>
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