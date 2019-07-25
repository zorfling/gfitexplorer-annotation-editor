import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBDGAVFJ8HaeUHDPyYCUN_vzfeyn1oasKE',
  authDomain: 'gfitexplorer-965e7.firebaseapp.com',
  databaseURL: 'https://gfitexplorer-965e7.firebaseio.com',
  projectId: 'gfitexplorer-965e7',
  storageBucket: 'gfitexplorer-965e7.appspot.com',
  messagingSenderId: '40197833455'
};

firebase.initializeApp(config);

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

export default firebase.firestore();
export { firebase, uiConfig };
