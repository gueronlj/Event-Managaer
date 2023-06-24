import Layout from "@/components/layout";
import styles from '@/pages/dashboard/dashboard.module.css';
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Attending from '@/components/Events/Attending.js';
import axios from 'axios';
import Link from "next/link";

const Dashboard = () => {
   const [currentUser, setCurrentUser] = useState(null);
   const [newEventForm, setNewEventForm] = useState(false);

   const getUserInfo = async( email ) => {
      const URL = '/api/users/profile'
      try {
         const response = await axios.post(`${URL}`, {
            email: email
         })
         console.log(response.data.id);
         setCurrentUser(response.data);
      } catch (err) { console.log(err) }
   }

   useEffect(() => {
      //Attatch Firebase authentication Observer
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
         if (user) {
            getUserInfo(user.email)
            console.log(currentUser);
         } else {  setCurrentUser(null) }
      })
   },[])

   return (
      <Layout>
         {currentUser &&
            <div className = {styles.dashboard}>
               <div className= {styles.window}>
                  <div className={styles.toolbar}>
                     <h2>Attending</h2>
                     <Link href={`/${encodeURIComponent(currentUser.email)}/organizing`}>
                        I am Organizing
                     </Link>
                     <button onClick={() => newEventForm? setNewEventForm(false):setNewEventForm(true)}>New</button>
                  </div>
                  <Attending
                     user={currentUser}/>               
               </div>              
            </div>}
      </Layout>
   )
}

export default Dashboard;
