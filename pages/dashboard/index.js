import Layout from "@/components/layout";
import styles from './dashboard.module.css'
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Organizing from "@/components/Events/Organizing.js";
import Attending from '@/components/Events/Attending.js';
import axios from 'axios';

const Dashboard = () => {
   const [currentUser, setCurrentUser] = useState(null);
   const [organizing, setOrganizing] = useState(false);
   const [attending, setAttending] = useState(true);
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
                     <a onClick={() => organizing? setOrganizing(false):setOrganizing(true)}>Organizing</a>
                     <a onClick={() => attending? setAttending(false):setAttending(true)}>Attending</a>
                     <button onClick={() => newEventForm? setNewEventForm(false):setNewEventForm(true)}>New</button>
                  </div>
                  {organizing &&
                     <Organizing
                        user={currentUser}/>
                  }
                  {attending &&
                     <Attending
                     user={currentUser}/>
                  }
                 
               </div>              
            </div>}
      </Layout>
   )
}

export default Dashboard;
