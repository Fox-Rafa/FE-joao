import { createContext, useContext, Context } from 'react';
import useFirebaseAuth from '../lib/useFirebaseAuth';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async (email, password) => { },
  createUserWithEmailAndPassword: async (email, password) => { },
  sendPasswordResetEmail: async email => { },
  signOut: async () => { },
  userData: async usr => { },
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export const useAuth = () => useContext(authUserContext);
