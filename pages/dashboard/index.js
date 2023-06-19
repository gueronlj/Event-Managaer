import Layout from "@/components/layout";
import styles from './dashboard.module.css'
import SideMenu from "@/components/sidemenu/SideMenu";
import Router from "next/router";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EventTable from "@/components/EventTable/EventTable";

const Dashboard = () => {

   const [currentUser, setCurrentUser] = useState(null)
   useEffect(() => {
   //Attatch Firebase authentication Observer
      const auth = getAuth()
      const user = auth.currentUser
      if(!user) {
         setCurrentUser(null)
         Router.push('/login')
      }else{
         setCurrentUser(user);
      }
   },[])

   return (
      <Layout>
         <div className = {styles.main}>
            <SideMenu/>
            
            <div className = {styles.dashboard}>
               <h1>My Events</h1>

               {currentUser && <EventTable
                  user={currentUser}/>}              
            </div>
         </div>
      </Layout>
   )
}

export default Dashboard;