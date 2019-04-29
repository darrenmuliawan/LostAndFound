import React, { Component } from "react";
import { Form, Message, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class SubmissionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateLost: new Date()
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
    console.log(date);
    this.setState({ dateLost: date });
  }

  inputChangeHandler(event) {
    const value = event.target.value;
    console.log(value);
  }

  submitForm() {
    // submit form to firebase
    this.setState({
      submitted: true
    });
  }

  render() {
    const { lostOrFound } = this.state;
    return (
      <Form success={this.state.submitted}>
        <Form.Group inline>
          <label>Lost an item or found an item?</label>
          <Form.Radio
            label="Lost"
            value="lost"
            checked={lostOrFound === "lost"}
            onChange={this.lostOrFoundHandler}
          />
          <Form.Radio
            label="Found"
            value="found"
            checked={lostOrFound === "found"}
            onChange={this.lostOrFoundHandler}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="First name" placeholder="First name" />
          <Form.Input fluid label="Last name" placeholder="Last name" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="Email" placeholder="jsmith@illinois.edu" />
          <Form.Input fluid label="Phone number" placeholder="xxx-xxx-xxxx" />
        </Form.Group>
        <Form.Field>
          <label>Date lost</label>
          <DatePicker
            selected={this.state.dateLost}
            onChange={this.dateHandler}
          />
        </Form.Field>
        <Form.TextArea
          label="Description of item(s)"
          onChange={this.inputChangeHandler}
        />
        {/* <Form.Checkbox label="I agree to the Terms and Conditions" /> */}
        <Form.Button onClick={this.submitForm}>Submit</Form.Button>
        <Message
          success
          header="Form Completed"
          content="You're all signed up for the newsletter"
        />
      </Form>
    );
  }
}

export default SubmissionForm;
