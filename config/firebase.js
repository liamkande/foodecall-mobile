import firebase from 'firebase'
require('firebase/firestore')

const config = {
  apiKey: "AIzaSyAvcRWynRCX82hpFw4BaUftV54LjQHDXSI",
  authDomain: "food-e-call-nativeapp.firebaseapp.com",
  databaseURL: "https://food-e-call-nativeapp.firebaseio.com",
  projectId: "food-e-call-nativeapp",
  storageBucket: "food-e-call-nativeapp.appspot.com",
  messagingSenderId: "920243376910"
}

firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()


export default db

//cleaned
