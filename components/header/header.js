import {useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import styles from './header.module.css'
import Router from 'next/router';

const firebaseConfig = {
     apiKey: process.env.NEXT_PUBLIC_APIKEY,
     authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
     projectId: process.env.NEXT_PUBLIC_PROJECTID,
     storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
     messagingSenderId: process.env.NEXT_PUBLIC_MESSENGERID,
     appId: process.env.NEXT_PUBLIC_APPID,
     measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);

const LogoutBtn = () => {
   const handleLogout = () => {
      const auth = getAuth();
      signOut(auth)
      console.log('logging out')
      Router.push('/login')
   }
   return(
      <button onClick={handleLogout}>Sign-out</button>
   )
}

const Header = () => {
   const [currentUser, setCurrentUser] = useState(null)

   const getUserInfo = async () => {
      try{
         const auth = getAuth(app)
         const user = auth.currentUser
         onAuthStateChanged(auth, (user) => {
           if (user) {
             // User logged in
             setCurrentUser(user);
           } else {
             setCurrentUser(null)
           }
         })
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
     getUserInfo()

   },[]);

   return (
      <div className = {styles.header}>
         <div className = {styles.logo}>
            <p>Event Manager</p>
         </div>
         { currentUser && <>
            <p>{currentUser.email}</p>
            <button>Profile</button>
            <LogoutBtn/>
         </>}
      </div>)
}

export default Header;
