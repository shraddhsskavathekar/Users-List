//these lines of code contain get data by key from Firebase then display to React.js
import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }
//record deletion from boards database
  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Board List</Link></h4>
            <h3 class="panel-title">
              {this.state.board.name}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Date Of Birth:</dt>
              <dd>{this.state.board.dob}</dd>
              <dt>Address:</dt>
              <dd>{this.state.board.address}</dd>
              <dt>Gender:</dt>
              <dd>{this.state.board.gender}</dd>
              <dt>College:</dt>
              <dd>{this.state.board.college}</dd>
              <dt>Hobbies:</dt>
              <dd>{this.state.board.hobbies}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
