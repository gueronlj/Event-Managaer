import {useState, useEffect} from 'react';
import styles from './sidemenu.module.css'

const SideMenu = () => {
   return (
      <div className = {styles.SideMenu}>
         <ul>
            <li>My Events</li>
            <li>Edit Profile</li>
         </ul>
      </div>
   )
}

export default SideMenu;
