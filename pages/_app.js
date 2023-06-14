import Login from '../components/login/login.js'
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {useState, useEffect} from 'react'

const MyApp = () => {

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
   const [user, setUser] = useState(null)

   const logout = () => {
      const auth = getAuth();
      signOut(auth)
   }

   useEffect(() => {
      //Attatch Firebase authentication Observer
      const auth = getAuth()
      const user = auth.currentUser
      onAuthStateChanged(auth, (user) => {
         if (user) {
            setUser(user)
         } else {
            setUser(null)//User signed off
         }
      })
   },[])

   if (!user ){
      return(
         <Login/>
      )
   } else {
      return(
         <div>
            <button onClick={logout}>Sign out</button>
            <h1>Dashboard here</h1>
         </div>
      )
   }
}

export default MyApp
