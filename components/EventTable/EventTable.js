import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import styles from './styles.module.css';
import useSWR from 'swr';
const EventTable = ({user}) => {

   const URL = '/api/events/eventsByUser';
   const USER_ID = useRef(1);

   const fetchData = async () => {
      try {
         const response = await axios.post(`${URL}`, {
            userId: USER_ID.current
         });
         return response.data;
      } catch (err) { console.log(err) } 
   }

   const { data, error, isLoading } = useSWR( `${URL}`, fetchData );

   return (
      <>
         {isLoading && <p>Loading...</p>}
         {error && <h2>{error?.code}</h2>}
         {data &&
            <div>
               {data.map((event) => {
                  return(
                     <div className={styles.card} key={event.id}>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>

                        <h4>Who&apos;s going</h4>
                        <ul>
                           {event.User.map((user) => {
                              return(
                                 <li key={user.id}>{user.email}</li>
                              )
                           })}
                        </ul>
                     </div>
                  )
               })}
            </div>
         }
      </>
   )
}

export default EventTable;
