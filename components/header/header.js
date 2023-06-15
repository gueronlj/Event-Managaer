import {useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import styles from './header.module.css'

const LogoutBtn = () => {
   const handleLogout = () => {
      const auth = getAuth();
      signOut(auth)
   }
   return(
      <button onClick={handleLogout}>Sign-out</button>
   )
}

const Header = () => {
   const [user, setUser] = useState(null)

   const getUserInfo = async () => {
      try{
         const auth = getAuth()
         const user = auth.currentUser
         setUser(user)
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
         { user && <p>{user.email}</p>}
         <button>Profile</button>
         <LogoutBtn/>
      </div>)
}

export default Header;
