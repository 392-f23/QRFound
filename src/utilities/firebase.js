

import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyDN41ayO362EYm-H-vzsAS3x-ESUxdRTFo",
  
    authDomain: "qrfound-95d07.firebaseapp.com",
  
    databaseURL: "https://qrfound-95d07-default-rtdb.firebaseio.com",
  
    projectId: "qrfound-95d07",
  
    storageBucket: "qrfound-95d07.appspot.com",
  
    messagingSenderId: "592501035460",
  
    appId: "1:592501035460:web:2b985f3c10074b78e2d491"
  
  };
  

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ), []);

  return [user];
};
export const useDbData = (path) => {
const [data, setData] = useState();
const [error, setError] = useState(null);

useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
    setData( snapshot.val() );
    }, (error) => {
    setError(error);
    })
), [ path ]);

return [ data, error ];
};

const makeResult = (error) => {
const timestamp = Date.now();
const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
const [result, setResult] = useState();
const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
}, [database, path]);

return [updateData, result];
};