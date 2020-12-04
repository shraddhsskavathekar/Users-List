//To show the list of the users in the users components, open and edit `src/App.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: [],
      
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { name, dob, address,gender,college,hobbies } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        dob,
        address,
        gender,
        college,
        hobbies,
      });
    });
    this.setState({
      boards
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              USER LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create" class="btn btn-primary">ADD NEW USER</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date Of Birth</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>College</th>
                  <th>Hobbies</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr>
                    <td><Link to={`/show/${board.key}`}>{board.name}</Link></td>
                    <td>{board.dob}</td>
                    <td>{board.address}</td>
                    <td>{board.gender}</td>
                    <td>{board.college}</td>
                    <td>{board.hobbies}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
