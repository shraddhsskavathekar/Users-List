//this page is created to alter existing records from users list
import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      dob: '',
      address: '',
      gender: '',
      college: '',
      hobbies: '',
    };
  }
//componentdidmount() checks is the record is present in database using unique id in firebase and if found updates the record.
  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          name: board.name,
          dob: board.dob,
          address: board.address,
          gender: board.gender,
          college: board.college,
          hobbies: board.hobbies,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name,dob, address,gender,college,hobbies } = this.state;

    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      name,
      dob,
      address,
      gender,
      college,
      hobbies
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        dob: '',
        address: '',
        gender: '',
        college: '',
        hobbies: '',
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="dob">Date Of Birth:</label>
                <input type="text" class="form-control" name="dob" value={this.state.dob} onChange={this.onChange} placeholder="Date Of Birth" />
              </div>
              <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" class="form-control" name="address" value={this.state.address} onChange={this.onChange} placeholder="Address" />
              </div>
              <div class="form-group">
                <label for="gender">Gender:</label>
                <input type="text" class="form-control" name="gender" value={this.state.gender} onChange={this.onChange} placeholder="Gender" />
              </div>
              <div class="form-group">
                <label for="college">College:</label>
                <input type="text" class="form-control" name="college" value={this.state.college} onChange={this.onChange} placeholder="college" />
              </div>
              <div class="form-group">
                <label for="hobbies">Hobbies:</label>
                <input type="text" class="form-control" name="hobbies" value={this.state.hobbies} onChange={this.onChange} placeholder="hobbies" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
