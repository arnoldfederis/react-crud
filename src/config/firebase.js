import firebase from 'firebase/compat'

firebase.initializeApp({
  apiKey: 'AIzaSyAMB1QVqJqjfWmB9HUFIIe62MeYpgVM9Yo',
  authDomain: 'react-crud-c9bd9.firebaseapp.com',
  databaseURL: 'https://react-crud-c9bd9-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'react-crud-c9bd9',
  storageBucket: 'react-crud-c9bd9.appspot.com',
  messagingSenderId: '727996863019',
  appId: '1:727996863019:web:3a19273621a79476cad06e',
  measurementId: 'G-V9WE6CE4KP'
})

export default firebase.firestore()
