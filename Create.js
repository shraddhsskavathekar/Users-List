//this page is created to add new user 
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      name: '',
      dob: '',
      address: '',
      gender: '',
      college: '',
      hobbies: '',
      fields: {},
      errors: {}
    };
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
  	this.setState({
    	checked: !this.state.checked
    })
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name,dob,address,gender,college,hobbies } = this.state;

    this.ref.add({
     name,
     dob,
     address,
     gender,
     college,
     hobbies
    }).then((docRef) => {
      this.setState({
        name: '',
        dob: '',
        address: '',
        gender: '',
        college: '',
        hobbies: '',
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
  //validation
  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    const dateFormat = 'DD-MM-YYYY';
    
    //Name
    if(!fields["name"]){
       formIsValid = false;
       errors["name"] = "Cannot be empty";
    }

    if(typeof fields["name"] !== "undefined"){
       if(!fields["name"].match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["name"] = "Only letters";
       }        
    }
   
  }
  
  render() {
    //hidden checkbox if other option selected
    const hidden = this.state.checked ? '' : 'hidden';
    
    const { name, dob,address,gender,college,hobbies } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD NEW USER
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Book List</Link></h4>
            
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name" >Name:</label>
                <input type="text"  class="form-control" name="name" value={name} onChange={this.onChange} placeholder="name" />
              </div>
              <div class="form-group">
                <label for="dob">Date Of Birth:</label>
                <input type="text" class="form-control" name="dob" value={dob} onChange={this.onChange} placeholder="DD-MM-YYYY " />
              </div>
              <div class="form-group">
                <label for="address">Address:</label>
                <textArea class="form-control" name="address" onChange={this.onChange} placeholder="address" cols="80" rows="3">{address}</textArea>
                
              </div>
              <div class="form-group">
                <label for="gender">Gender:</label>
                <input type="text" class="form-control" name="gender" value={gender} onChange={this.onChange} placeholder="gender" />
              </div>
              <div class="form-group">
                <label for="college">College:</label>
                <input type="text" class="form-control" name="college" value={college} onChange={this.onChange} placeholder="college" />
              </div>
              <div class="form-group">
                <label for="hobbies">Hobbies:</label>
              <div>Drawing: 
              <input type="checkbox" id="checkbox_one" name="question1" data-trigger="hidden_fields_one" class="trigger"/>
              </div>
              <div>Reading: 
              <input type="checkbox" id="checkbox_one" name="question1" data-trigger="hidden_fields_one" class="trigger"/>
              </div>
              <div>Gaming: 
              <input type="checkbox" id="checkbox_one" name="question1" data-trigger="hidden_fields_one" class="trigger"/>
              </div>
              <div>Travelling: 
              <input type="checkbox" id="checkbox_one" name="question1" data-trigger="hidden_fields_one" class="trigger"/>
              </div>
              
            <div>
      	<label>Other</label>
        <input type="checkbox" checked={ this.state.checked } onChange={ this.handleChange } />
      </div>
      <div className={ hidden }><input type="text" id="hidden_one" name="hidden"/></div>
      </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
            
          </div>
        </div>
      </div>
      
    );
  }
}

export default Create;
