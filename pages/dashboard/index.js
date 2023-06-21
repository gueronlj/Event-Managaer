import Layout from "@/components/layout";
import styles from './dashboard.module.css'
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EventTable from "@/components/EventTable/EventTable";
import axios from 'axios';

const Dashboard = () => {
   const [currentUser, setCurrentUser] = useState(null);

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
               <h1>My Event </h1>

               <EventTable
                  user={currentUser}/>
            </div>}
      </Layout>
   )
}

export default Dashboard;
