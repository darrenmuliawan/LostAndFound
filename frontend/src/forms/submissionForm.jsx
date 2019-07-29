import React, { Component } from 'react';
import './forms.scss';
import { Form, Select, Divider, Message } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import axios from 'axios';

const categoryOptions = [
    { key: "b", text: "Book", value: "Book" },
    { key: "bpw", text: "Bag/Purse/Wallet", value: "Bag/Purse/Wallet" },
    { key: "c", text: "Clothing/Shoes", value: "Clothing/Shoes" },
    { key: "cd", text: "Credit/Debit Card", value: "Credit/Debit Card" },
    { key: "cp", text: "Cell Phone", value: "Cell Phone" },
    { key: "d", text: "Driver's License/ID", value: "Driver's License/ID" },
    { key: "e", text: "Electronics", value: "Electronic" },
    { key: "g", text: "Glasses", value: "Glasses" },
    { key: "j", text: "Jewelry", value: "Jewelry" },
    { key: "k", text: "Keys", value: "Keys" },
    { key: "l", text: "Laptop", value: "Laptop" },
    { key: "o", text: "Other", value: "Other" }
  ];

class SubmissionForm extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            category: '',
            date: new Date(),
            success: false,
        }
    }

    handleChange = (e, { value }) => {
        this.setState({value: value})
    }

    handleChangeCategory = (e, { value }) => {
        this.setState({category: value})
    }

    handleChangeDate = (date) => {
        this.setState({date: date})
    }
    
    handleClick = () => {        
        let location = document.getElementById("location").value;
        let category = this.state.category;
        let brand = document.getElementById("brand").value;
        let model = document.getElementById("model").value;
        let description = document.getElementById("description").value;
        let date = this.state.date;

        if (this.state.value === "lost" || this.props.user.admin === false) {
            let lostBy = this.props.user._id;
            axios.post("https://floating-dusk-33053.herokuapp.com/api/lostitems", { location, category, brand, model, description, date, lostBy }).then( res => {
                if (res.status === 201) {
                    this.setState({success: true})
                    let user_id = res.data.data.lostBy;
                    let item_id = res.data.data._id;
                    let activity = "You posted a Lost item: " + res.data.data.brand + ' ' + res.data.data.model + " (Item ID #" + item_id + ")";
                    axios.put("https://floating-dusk-33053.herokuapp.com/api/users/" + user_id, { activity })

                    // NOTIFY ALL ADMINS
                    axios.get("https://floating-dusk-33053.herokuapp.com/api/users/?where={\"admin\":true}").then(res => {
                        let user_arr = res.data.data;
                        let i = 0;
                        for (i = 0; i < user_arr.length; i++) {
                            let uid = user_arr[i]._id;
                            let notification = this.props.user.name + " posted Lost item (#" + item_id + ")";
                            axios.put("https://floating-dusk-33053.herokuapp.com/api/users/" + uid, { notification })
                        }
                    })
                }
            }).then(res => {
                if (this.props.update) {
                    this.props.update();
                }
            })
        } else if (this.state.value === "found") {
            let foundBy = this.props.user._id;
            axios.post("https://floating-dusk-33053.herokuapp.com/api/founditems", { location, category, brand, model, description, date, foundBy }).then( res => {
                console.log(res);
                
                if (res.status === 201) {
                    console.log('sukses bro');
                    this.setState({success: true});
                    let user_id = res.data.data.foundBy;
                    let item_id = res.data.data._id;
                    let activity = "You posted a Found item: " + res.data.data.brand + ' ' + res.data.data.model + " (Item ID #" + item_id + ")";
                    axios.put("https://floating-dusk-33053.herokuapp.com/api/users/" + user_id, { activity })
                }
            }).then(res => {
                if (this.props.update) {
                    this.props.update();
                }
            })
        }        
    }

    render() {
        return (
            <Form>
                { this.props.user.admin === true ? 
                    <Form.Group inline>
                        <label> I have.. </label>
                        <Form.Radio 
                            label="Lost an item" 
                            value="lost" 
                            checked={ this.state.value === "lost"} 
                            onChange={this.handleChange}/>
                        <Form.Radio 
                            label="Found an item" 
                            value="found" 
                            checked={ this.state.value === "found"} 
                            onChange={this.handleChange}/>
                    </Form.Group>
                :
                    <h2> What did you lose today? </h2>
                }
                
                <Divider/>
                <Form.Input fluid label="Name" defaultValue= { this.props.user.name } id="name"/>
                <Form.Input fluid label="Email" defaultValue= { this.props.user.email } id="email"/>
                <Form.Input fluid label="Phone" defaultValue= { this.props.user.phone } id="phone"/>
                <Form.Field
                    label="Category"
                    control={Select}
                    options={categoryOptions}
                    placeholder="Select category"
                    onChange={this.handleChangeCategory}
                    />
                <Form.Input fluid label="Brand" placeholder="e.g. Nike, iPhone, Samsung, etc" id="brand"/>
                <Form.Input fluid label="Model" placeholder="e.g. Yeezy 350, XS Max, S10, etc" id="model"/>
                <Form.Field>
                    <label>Date Lost/Found</label>
                    <DatePicker selected={ this.state.date } onChange={this.handleChangeDate} />
                </Form.Field>
                <Form.Input fluid label="Location" placeholder="Search for places..." id="location"/>
                <Form.TextArea label="Description" placeholder="Describe your item" id="description"/>
                <Form.Button color="green" style={{width: '100%'}} onClick={ this.handleClick }> Submit </Form.Button> 
                {this.state.success && <Message success visible={this.state.success} header="Success!" content="Successfully posted an item" className="success-message"/>}
            </Form>
        )
    }
}

export default SubmissionForm;