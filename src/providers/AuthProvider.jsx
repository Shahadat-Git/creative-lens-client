import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase.config';
import { json } from 'react-router-dom';


export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();


    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (data) => {
        setLoading(true);
        return updateProfile(auth.currentUser, data);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // auth state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
            console.log('auth state changed', loggedUser)
            setUser(loggedUser)
            setLoading(false);
            if (loggedUser && loggedUser?.email) {
                const user = {
                    name: loggedUser.displayName,
                    email: loggedUser.email,
                    role: 'user'
                }

                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ email: user.email })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.token) {
                            localStorage.setItem('access-token', data.token);
                        }
                    })


                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                    })
            }
            else {
                localStorage.removeItem('access-token')
            }
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        signIn,
        signUp,
        loading,
        updateUser,
        logOut,
        googleSignIn,



    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;