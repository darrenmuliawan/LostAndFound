import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './admin-homepage.scss'
import { Grid, Card, Image, List } from 'semantic-ui-react'
import ItemDetails from './item-details.jsx'

/* let items2 = [
    {index: 0, name: "Lost iPhone", brand: "Apple", color: "Black", type: "Electronic", description: "Lost in Grainger Library.", 
    imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg","https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg","https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 1, name: "Lost Samsung", type: "Electronic", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 2, name: "Lost Bose Earphone", type: "Electronic", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 3, name: "Lost iPhone XS Max", type: "Electronic", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 4, name: "Lost iphone", type: "Electronic", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 5, name: "Lost iphone", type: "Electronic", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 6, name: "Lost iphone", type: "Electronic", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 7, name: "Lost keys", type: "Keys", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 8, name: "Lost iphone", type: "Electronic", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 9, name: "Lost iphone", type: "Electronic", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 10, name: "Lost iphone", type: "Electronic", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 11, name: "Lost iphone", type: "Electronic", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 12, name: "Lost iphone", type: "Electronic", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 13, name: "Lost iphone", type: "Electronic", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 14, name: "Hello", type: "Clothes", description: "Lost in Grainger Library", imageUrl: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone/xs/iphone-xs-max-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795409154",
    "https://cnet1.cbsistatic.com/img/UgeE_LeHUPKtsr413c_Nt8YtLhA=/868x488/2018/09/17/ff8ce8b7-fb73-4d2b-ae99-f546652e38df/44-iphone-xs.jpg"]},
    {index: 15, name: "The End", type: "Other", description: "Lost in Grainger Library"},
] */

class ItemsGrid extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            selectedItem: {},
            selectedIndex: 0,
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
            }]
        }
    }

    handleOpenClick = (item) => {
        const f = () => {
            this.setState({
                open: true,
                selectedItem: item,
                selectedIndex: item.index + 1,
                items: this.props.items
            })
        }
        return f;
    }

    handleClose = item => {
        this.setState({
            selectedItem: item,
            selectedIndex: item.index,
            open: false
        });
    }

    prevItemDetails = () => {
        console.log("BALEK BRO");
        console.log(this.state.selectedIndex);

        if (this.state.selectedIndex != 0) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex - 1
            }));
        }
    }

    nextItemDetails = () => {
        console.log("NEXT BRO");
        console.log(this.state.selectedIndex);

        if (this.state.selectedIndex != 15) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1
            }));
        }
    }

    render () {
        console.log(this.props.items);
        
        let filter = this.props.filter;
        let output = JSON.parse(JSON.stringify(this.props.items));

        if (filter.length !== 0) {
            let i;
            for (i = 0; i < filter.length; i++) {
                output = output.filter(item => item.category.includes(filter[i]));
            }
        }
        /* if (filter.length !== 0) {
            let i;
            console.log("Filtering begin!");

            for (i = 0; i < filter.length; i++) {
                output.forEach(item => {
                    if (!item.category.includes(filter[i])) {
                        item.brand = "Not this!";
                        console.log(output);
                        console.log(this.state.items);
                    }
                })
            }
        } */

        return (
            <div className="containers">
                <div>
                    <p className="list-title"> List of Lost Items: (Found: { this.props.numLost } items) </p>
                </div>
                <List selection divided relaxed className="item-list" style={{maxHeight: 200, overflow: 'auto'}}>
                    {output.map(item => 
                        <List.Item onClick={this.handleOpenClick(item)}>
                            <List.Content >
                                <List.Header>
                                    {item.fullName}
                                </List.Header>
                                <List.Description>
                                    {item.brand}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    )}
                </List>

                <ItemDetails
                    selectedItem = { this.state.selectedItem }
                    open = { this.state.open }
                    onClose = { this.handleClose }
                    nextItem = { this.nextItemDetails }
                    prevItem = { this.prevItemDetails }
                    selectedIndex = { this.state.selectedIndex }
                    items = { this.props.allItems }
                />
            </div>
        )
        /*return (
            <div className="containers">
                <Grid columns={4}>
                    {output.map(item =>
                        <Grid.Column>
                            <Card
                                header= {item.brand}
                                meta= {item.category}
                                description= {item.description}
                                onClick={this.handleOpenClick(item)}
                            />
                        </Grid.Column>
                    )}
                </Grid>

                <ItemDetails
                    selectedItem = { this.state.selectedItem }
                    open = { this.state.open }
                    onClose = { this.handleClose }
                    nextItem = { this.nextItemDetails }
                    prevItem = { this.prevItemDetails }
                    selectedIndex = { this.state.selectedIndex }
                    items = { this.props.allItems }
                />
                
            </div>
        )*/
    }
}

export default ItemsGrid;
