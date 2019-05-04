import React, { Component } from "react";
import { Form, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import LocationSearchInput from "./LocationSearchInput";
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

import "react-datepicker/dist/react-datepicker.css";
import { FormHome } from "./SubmissionForm.module.scss";

const options = [
  { key: "b", text: "Book", value: "Book" },
  { key: "bpw", text: "Bag/Purse/Wallet", value: "Bag/Purse/Wallet" },
  { key: "c", text: "Clothing/Shoes", value: "Clothing" },
  { key: "cd", text: "Credit/Debit Card", value: "Card" },
  { key: "cp", text: "Cell Phone", value: "Cell Phone" },
  { key: "d", text: "Driver's License/ID", value: "License" },
  { key: "e", text: "Electronics", value: "Electronics" },
  { key: "g", text: "Glasses", value: "Glasses" },
  { key: "j", text: "Jewelry", value: "Jewelry" },
  { key: "k", text: "Keys", value: "Keys" },
  { key: "l", text: "Laptop", value: "Laptop" },
  { key: "o", text: "Other", value: "Other" }
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


    geocodeByAddress( data.location)
      .then(results => getLatLng(results[0]))
      .then(ll => {
        let latLng = ll;
        console.log('Success', latLng)
        const db = firebase.firestore();
        db.collection("items")
          .add({
            brand: data.brand,
            category: data.category,
            dateLostOrFound: data.dateLostOrFound,
            description: data.description,
            email: data.email,
            fullName: `${data.firstName} ${data.lastName}`,
            location: data.location,
            latLng: latLng,
            lostOrFound: data.lostOrFound,
            phoneNumber: data.phoneNumber,
            file: fileDownloadUrl,
            found: 0
          })
          .then(docRef => {

            const db = firebase.firestore();

            console.log("item", data);
            let oppositeState = (data.lostOrFound == "lost") ? "found" : "lost";
            db.collection("items")
            .where("lostOrFound", "==", oppositeState)
            .where("category", "==", data.category)
            .get()
            .then((mItem) => {
                mItem.forEach((i) => {
                  let mData = i.mData();
                    console.log(mData);
                    if(mData && mData.latLng && mData.latLng.lat && mData.latLng.lng){
                      let d = distance(mData.latLng.lat, mData.latLng.lng, data.latLng.lat, data.latLng.lng);
                      let e = editDistance(mData.brand, data.brand);
                      let c = compareTitles(mData.brand, data.brand);
                      if(d < 0.5 && (e < 10 || c > 0.6)){
                        console.log("MATCH", data);//NOTIFY USER
                      }
                    }
                })
              });

          })
          .catch(err => console.log(err));
        this.setState({
          submitted: true,
          error: false
        });
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


//Calculate distance between 2 lats and longs
//https://www.geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344;
		return dist;
	}
}

function compareTitles(s1, s2){
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  let a1 = s1.split(" ");
  let a2 = s2.split(" ");
  let v1 = 0;
  let v2 = 0;
  a1.map(w => {
    if(s2.includes(w)){
      v1++;
    }
  })

  a2.map(w => {
    if(s1.includes(w)){
      v2++;
    }
  })

  return (v1/a1.length + v2/a2.length)/2;
}

//https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
