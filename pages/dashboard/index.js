import Layout from "@/components/layout";
import styles from './dashboard.module.css'
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EventTable from "@/components/EventTable/EventTable";
import getUserId from "@/components/helpers/getUserId";

const Dashboard = () => {
   const [currentUser, setCurrentUser] = useState({email:''});
   const [userId, setUserId] = useState('')

   useEffect(() => {
      //Attatch Firebase authentication Observer
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
         if (user) {
            console.log(user.email)
            setCurrentUser(user);
            setUserId( getUserId(user.email) );
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
