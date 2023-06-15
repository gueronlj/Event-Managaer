import {useState, useEffect} from 'react';
import styles from './dashboard.module.css'
import SideMenu from '../sidemenu/SideMenu.js'

const Dashboard = () => {
   return (
      <div className = {styles.main}>
         <SideMenu/>
         <div className = {styles.dashboard}>
            <h1>Dashboard</h1>
            <p>Content here</p>
         </div>
      </div>
   )
}

export default Dashboard;
