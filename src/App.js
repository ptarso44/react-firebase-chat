import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAMjT1KgHUt04SyHSZawyAeENh_Pu0eA14",
  authDomain: "react-chat-app-b5f80.firebaseapp.com",
  projectId: "react-chat-app-b5f80",
  storageBucket: "react-chat-app-b5f80.appspot.com",
  messagingSenderId: "463003048426",
  appId: "1:463003048426:web:a567b03aee9150ac74fa93",
  measurementId: "G-R9QBEF2CQN",
});

const auth = firebase.auth;
const firestore = firebase.firestore();

const [user] = useAuthState(auth);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <section>
          { user ? <ChatRoom /> : <SignIn /> }
        </section>
      </header>
    </div>
  );
}

// FUNCTIONS

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={ signInWithGoogle }>Sign in with Google</button>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button onclick={ () => auth.signout() }>Sign Out</button>
  );
}

function ChatRoom() {
  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id'});

  return (
    <div>
      { messages && messages.map( msg => <ChatMessage key={msg.id} message={msg} /> ) }
    </div>
  );
}

function ChatMessage(props) {

  const { text, uid } = props.message;

  return <p>{text}</p>
}

export default App;
