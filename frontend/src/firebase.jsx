import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAXh0bhHnzUDfFmEdnX0yyLuLbncYhNAqE",
  authDomain: "ilini-lostandfound.firebaseapp.com",
  databaseURL: "https://ilini-lostandfound.firebaseio.com",
  projectId: "ilini-lostandfound",
  storageBucket: "ilini-lostandfound.appspot.com",
  messagingSenderId: "596991029999"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();
}

export default Firebase;
