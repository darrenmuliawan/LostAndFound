import React, { Component } from "react";
import { Form, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import LocationSearchInput from "./LocationSearchInput";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

import "react-datepicker/dist/react-datepicker.css";
import { FormHome } from "./SubmissionForm.module.scss";

const options = [
  { key: "b", text: "Book", value: "book" },
  { key: "bpw", text: "Bag/Purse/Wallet", value: "bag/purse/wallet" },
  { key: "c", text: "Clothing/Shoes", value: "clothing" },
  { key: "cd", text: "Credit/Debit Card", value: "card" },
  { key: "cp", text: "Cell Phone", value: "cell phone" },
  { key: "d", text: "Driver's License/ID", value: "license" },
  { key: "e", text: "Electronics", value: "electronics" },
  { key: "g", text: "Glasses", value: "glasses" },
  { key: "j", text: "Jewelry", value: "jewelry" },
  { key: "k", text: "Keys", value: "keys" },
  { key: "l", text: "Laptop", value: "laptop" },
  { key: "o", text: "Other", value: "other" }
];

class SubmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "",
      category: "",
      description: "",
      email: "",
      firstName: "",
      lastName: "",
      location: "",
      lostOrFound: "",
      phoneNumber: "",
      file: null,
      dateLostOrFound: new Date(),
      submitted: false,
      error: false
    };
    this.fileInputRef = React.createRef();
    this.lostOrFoundHandler = this.lostOrFoundHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.dateHandler = this.dateHandler.bind(this);
    this.fileChange = this.fileChange.bind(this);
  }

  lostOrFoundHandler(event, { value }) {
    if (value === "lost") {
      this.setState({ lostOrFound: "lost" });
    } else if (value === "found") {
      this.setState({ lostOrFound: "found" });
    }
  }

  dateHandler(date) {
    this.setState({ dateLostOrFound: date });
  }

  inputChangeHandler(event, data) {
    event.target.name
      ? this.setState({ [event.target.name]: data.value })
      : this.setState({ [data.name]: data.value });
  }

  fileChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  async submitHandler() {
    const data = this.state;
    for (const key in data) {
      if (data[key] === "") {
        this.setState({
          submitted: false,
          error: true
        });
        return;
      }
    }

    let fileDownloadUrl = "";
    const file = data.file;
    if (file) {
      const storageRef = firebase.storage().ref("images/" + file.name);
      fileDownloadUrl = await storageRef
        .put(file)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .catch(err => console.log(err));
    }

    const db = firebase.firestore();
    db.collection("items")
      .add({
        brand: data.brand,
        category: data.category,
        dataeLostOrFound: data.dateLostOrFound,
        description: data.description,
        email: data.email,
        fullName: `${data.firstName} ${data.lastName}`,
        location: data.location,
        lostOrFound: data.lostOrFound,
        phoneNumber: data.phoneNumber,
        file: fileDownloadUrl
      })
      .then(docRef => console.log(docRef))
      .catch(err => console.log(err));
    this.setState({
      submitted: true,
      error: false
    });
  }

  render() {
    const { lostOrFound, submitted, error, dateLostOrFound } = this.state;
    return (
      <Form className={FormHome} success={submitted} error={error}>
        <Form.Group inline>
          <label>I have...</label>
          <Form.Radio
            label="Lost an item"
            value="lost"
            checked={lostOrFound === "lost"}
            onChange={this.lostOrFoundHandler}
          />
          <Form.Radio
            label="Found an item"
            value="found"
            checked={lostOrFound === "found"}
            onChange={this.lostOrFoundHandler}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            name="firstName"
            label="First name"
            placeholder="First name"
            onChange={this.inputChangeHandler}
          />
          <Form.Input
            fluid
            name="lastName"
            label="Last name"
            placeholder="Last name"
            onChange={this.inputChangeHandler}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            name="email"
            label="Email"
            placeholder="jsmith@illinois.edu"
            onChange={this.inputChangeHandler}
          />
          <Form.Input
            fluid
            name="phoneNumber"
            label="Phone number"
            type="number"
            placeholder="xxx-xxx-xxxx"
            onChange={this.inputChangeHandler}
          />
        </Form.Group>
        <Form.Field>
          <label>Date Lost/Found</label>
          <DatePicker selected={dateLostOrFound} onChange={this.dateHandler} />
        </Form.Field>
        <Form.Select
          fluid
          name="category"
          label="Item Category"
          options={options}
          placeholder="Category"
          onChange={this.inputChangeHandler}
        />
        <Form.Input
          fluid
          name="brand"
          label="Brand/Model"
          placeholder="e.g. Nike, Samsung Galaxy S10"
          onChange={this.inputChangeHandler}
        />
        <Form.Field>
          <label>Location Lost/Found</label>
          <LocationSearchInput
            onChange={loc => this.setState({ location: loc })}
          />
        </Form.Field>
        <Form.Field>
          <label>Upload Image (Optional)</label>
          <Form.Button onClick={() => this.fileInputRef.current.click()}>
            Choose File
          </Form.Button>
          <input
            ref={this.fileInputRef}
            type="file"
            hidden
            onChange={this.fileChange}
          />
        </Form.Field>
        <Form.TextArea
          label="Description of item"
          name="description"
          onChange={this.inputChangeHandler}
        />
        <Form.Button onClick={this.submitHandler}>Submit</Form.Button>
        <Message success header="Success" content="Form submitted." />
        <Message error header="Error" content="Incomplete fields." />
      </Form>
    );
  }
}

export default SubmissionForm;
