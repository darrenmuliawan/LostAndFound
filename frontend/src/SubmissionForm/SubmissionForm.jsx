import React, { Component } from "react";
import { Form, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";

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
      lostOrFound: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      description: "",
      dateLost: new Date(),
      submitted: false,
      error: false
    };

    this.lostOrFoundHandler = this.lostOrFoundHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.dateHandler = this.dateHandler.bind(this);
  }

  lostOrFoundHandler(event, { value }) {
    if (value === "lost") {
      this.setState({ lostOrFound: "lost" });
    } else if (value === "found") {
      this.setState({ lostOrFound: "found" });
    }
  }

  dateHandler(date) {
    this.setState({ dateLost: date });
  }

  inputChangeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitForm() {
    const data = this.state;
    const missingFields = [];
    for (const key in data) {
      if (data[key] === "") {
        missingFields.push(key);
      }
    }

    if (missingFields.length) {
      this.setState({
        submitted: false,
        error: true
      });
    } else {
      this.setState({
        submitted: true,
        error: false
      });
      // submit form to firebase
      console.log(data);
    }
  }

  render() {
    const { lostOrFound, submitted, error, dateLost } = this.state;
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
            placeholder="xxx-xxx-xxxx"
            onChange={this.inputChangeHandler}
          />
        </Form.Group>
        <Form.Field>
          <label>Date Lost/Found</label>
          <DatePicker selected={dateLost} onChange={this.dateHandler} />
        </Form.Field>
        <Form.Select
          fluid
          label="What type of item did you lose/find?"
          options={options}
          placeholder="Category"
        />
        <Form.Input
          fluid
          name="brand"
          label="Brand"
          placeholder="Brand"
          onChange={this.inputChangeHandler}
        />
        <Form.TextArea
          label="Description of item"
          name="description"
          onChange={this.inputChangeHandler}
        />
        <Form.Button onClick={this.submitForm}>Submit</Form.Button>
        <Message
          success
          header="Form Completed"
          content="Lost/Found item has been submitted"
        />
        <Message error header="Error" content="Incomplete fields." />
      </Form>
    );
  }
}

export default SubmissionForm;
