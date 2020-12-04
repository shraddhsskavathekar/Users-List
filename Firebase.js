import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

// configuration details to link firebase database to react app
const config = {
  apiKey: "AIzaSyAPy0Nv6wUM2RlOTLes-u4Io89VcLJx8rg",
  authDomain: "users-9afbb.firebaseapp.com",
  databaseURL: "https://users-9afbb-default-rtdb.firebaseio.com",
  projectId: "users-9afbb",
  storageBucket: "users-9afbb.appspot.com",
  messagingSenderId: "782360234375",
  appId: "1:782360234375:web:fa8a62e3cf65265bd2ab22",
  measurementId: "G-1ZEVXCDJ5F"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
