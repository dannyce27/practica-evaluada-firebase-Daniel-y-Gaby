import { useState, useEffect } from 'react';

import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

import { auth, db } from '../src/config/firebase.js';
 
export const useAuth = () => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
 
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      setUser(user);

      setLoading(false);

    });

    return unsubscribe;

  }, []);
 
  const register = async (userData) => {

    try {

      const { email, password, ...otherData } = userData;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, 'users', userCredential.user.uid), {

        email,

        ...otherData,

        createdAt: new Date().toISOString()

      });

      return { success: true };

    } catch (error) {

      return { success: false, error: error.message };

    }

  };
 
  const login = async (email, password) => {

    try {

      await signInWithEmailAndPassword(auth, email, password);

      return { success: true };

    } catch (error) {

      return { success: false, error: 'Credenciales incorrectas' };

    }

  };
 
  const logout = async () => {

    try {

      await signOut(auth);

      return { success: true };

    } catch (error) {

      return { success: false, error: error.message };

    }

  };
 
  const getUserData = async () => {

    if (!user) return null;

    try {

      const docRef = doc(db, 'users', user.uid);

      const docSnap = await getDoc(docRef);

      return docSnap.exists() ? docSnap.data() : null;

    } catch (error) {

      console.error('Error fetching user data:', error);

      return null;

    }

  };
 
  const updateUserData = async (data) => {

    if (!user) return { success: false, error: 'No user logged in' };

    try {

      const docRef = doc(db, 'users', user.uid);

      await updateDoc(docRef, data);

      return { success: true };

    } catch (error) {

      return { success: false, error: error.message };

    }

  };
 
  return {

    user,

    loading,

    register,

    login,

    logout,

    getUserData,

    updateUserData

  };

};
 