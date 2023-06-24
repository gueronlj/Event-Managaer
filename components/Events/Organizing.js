import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import styles from './styles.module.css';
import useSWR from 'swr';
import EventCard from "../EventCard/EventCard";

const Organizing = ( { user } ) => {

   const URL = '/api/events/by-organizer';

   const fetchData = async () => {
      try {
         const response = await axios.post(`${URL}`, {
            userId: user.id
         });
         return response.data;
      } catch (err) { console.log(err) }
   }

   const { data, error, isLoading } = useSWR( `${URL}`, fetchData );

   return (<>
      {isLoading && <p>Loading...</p>}
      {error && <h2>{error?.code}</h2>}
      {data &&
         <div>
            {data.map((event) => {
               return(
                  <EventCard
                     key={event.id}
                     title={event.title}
                     description={event.description}
                     start={event.start}
                     end={event.end}
                     attendies={event.User}/>
               )
            })}
         </div>
      }
   </>)
}

export default Organizing;
