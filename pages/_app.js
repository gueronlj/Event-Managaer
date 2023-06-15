import Login from '../components/login/login.js'
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {useState, useEffect} from 'react'
import Layout from '../components/layout.js'
import Dashboard from '../components/dashboard/dashboard.js'
import './globals.css'

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
         <Layout>
            <Dashboard/>
         </Layout>
      )
   }
}

export default MyApp
