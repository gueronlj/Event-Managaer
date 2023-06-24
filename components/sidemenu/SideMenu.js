import {useState, useEffect} from 'react';
import styles from './sidemenu.module.css'
import Link from 'next/link';

const SideMenu = () => {
   return (
      <div className = {styles.SideMenu}>
         <ul>
            <li> <Link href={`/dashboard`}>Dashboard</Link></li>
            <li>My Events</li>
            <li>Edit Profile</li>
         </ul>
      </div>
   )
}

export default SideMenu;
