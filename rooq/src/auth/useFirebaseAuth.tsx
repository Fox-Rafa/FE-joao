import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const formatAuthUser = user => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async authState => {
    if (!authState) {
      setLoading(false);
      return;
    }

    setLoading(true);

    var formattedUser = formatAuthUser(authState);

    setAuthUser(formattedUser);

    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const userData = usr => {
    console.log('usr: ', usr);
    //console.log('usr.currentUser: ', usr.currentUser)
  };

  const signInWithEmailAndPassword = (email, password) =>
    auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email, password) =>
    auth().createUserWithEmailAndPassword(email, password);

  const sendPasswordResetEmail = email => auth().sendPasswordResetEmail(email);

  const signOut = () => auth().signOut().then(clear);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    userData,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  };
}
