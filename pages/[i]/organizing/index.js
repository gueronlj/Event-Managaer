import Layout from "@/components/layout";
import styles from '@/pages/dashboard/dashboard.module.css';
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Organizing from "@/components/Events/Organizing.js";
import axios from 'axios';
import Link from "next/link";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
   const [currentUser, setCurrentUser] = useState(null);
   const [newEventForm, setNewEventForm] = useState(false);
   const [loading, setLoading] = useState(false);

   const getUserInfo = async( email ) => {
      const URL = '/api/users/profile'
      try {
         setLoading(true);
         const response = await axios.post(`${URL}`, {
            email: email
         })
         console.log(response.data.id);
         setCurrentUser(response.data);
         setLoading(false);
      } catch (err) { console.log(err) }
   }

   const getCurrentUser = async() => {
      try{
         setLoading(true)
         const auth = getAuth()
         onAuthStateChanged(auth, (user) => {
            if (user) {
               getUserInfo(user.email)
               console.log(currentUser);
            } else {  setCurrentUser(null) }
         })
         setLoading(false)
      } catch (err) {
         console.log(err)
      }     
   }

   useEffect(() => {
      //Attatch Firebase authentication Observer
      getCurrentUser() 
   },[])

   return (
      <Layout>
         {currentUser &&
            <div className = {styles.dashboard}>
               {loading ? <BarLoader /> :
                  <div className= {styles.window}>
                     <div className={styles.toolbar}>               
                        <h2>Organizing</h2>
                        <Link href={`/${encodeURIComponent(currentUser.email)}/attending`}>
                           I am Attending
                        </Link>
                        <button onClick={() => newEventForm? setNewEventForm(false):setNewEventForm(true)}>New</button>
                     </div>
                  <Organizing
                     user={currentUser}/>               
                  </div>          
               }                  
            </div>}
      </Layout>
   )
}

export default Dashboard;
