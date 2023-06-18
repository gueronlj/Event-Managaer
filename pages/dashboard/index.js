import Layout from "@/components/layout";
import styles from './dashboard.module.css'
import SideMenu from "@/components/sidemenu/SideMenu";
import Router from "next/router";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
   useEffect(() => {
   //Attatch Firebase authentication Observer
      const auth = getAuth()
      const user = auth.currentUser 
      if(!user) {
         Router.push('/login')
      }  
   },[])

   return (
      <Layout>
         <div className = {styles.main}>
            <SideMenu/>
            
            <div className = {styles.dashboard}>
               <h1>Dashboard</h1>
               <p>Content here</p>
            </div>
         </div>
      </Layout>
   )
}

export default Dashboard;