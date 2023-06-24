import styles from './eventcard.module.css'
import ActionBar from '../ActionBar/ActionBar';
import { useState } from 'react';

const EventCard = ( { title, description, start, end, attendies }) => {

   const [showAttendies, setShowAttendies] = useState(false);

   return(
      <div className={styles.card}>
         <ActionBar/>
         <div className={styles.content}>
            <div className={styles.datetime}>
               <h3>{title}</h3>
               <h4>{start}</h4>
               <h4>{end}</h4>
            </div>           
            <p>{description}</p>
            <div>
               <h4 onClick={() => showAttendies? setShowAttendies(false):setShowAttendies(true)}>Who is going?</h4>
                  {showAttendies &&               
                     <ul>
                        {attendies.map((user) => {
                           return(
                              <li key={user.id}>{user.email}</li>
                           )
                        })}
                     </ul>
                  }
            </div>              
         </div>
      </div>
   )
}

export default EventCard;