import {useState, useEffect} from 'react';
import styles from './sidemenu.module.css'
import Link from 'next/link';
import ListMenu from '../ListMenu/ListMenu';

const SideMenu = () => {
   return (
      <div className = {styles.SideMenu}>
         <ul>
            <li> <Link href={`/dashboard`}>Events</Link></li>
            <li><Link href={`/scheduler`}>Scheduler</Link></li>
            <li>Edit Profile</li>
         </ul>
      </div>
   )
   // return (
   //    <div className = {styles.SideMenu}>
   //       <ListMenu />
   //    </div>
   // )
}

export default SideMenu;
