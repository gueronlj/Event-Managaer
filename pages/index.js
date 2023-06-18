import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
   
const MyApp = ({Component, pagePROPS}) => {

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
   const router = useRouter();

   useEffect(() => {
      //Attatch Firebase authentication Observer
      const auth = getAuth()
      const user = auth.currentUser      
         if (user) {
            router.push('/dashboard')
            
         } else {
            router.push('/login');
         }             
   },[])
}

export default MyApp
