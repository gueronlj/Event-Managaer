import { useState, useEffect } from "react";
import axios from 'axios';
import styles from './styles.module.css';

const EventTable = ({user}) => {

   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null)

   const fetchData = async () => {
      try{
         setLoading(true)
         const response = await axios.post('/api/events/eventsByUser', {
             userId: 1
         });
         setData(response.data)
         console.log(response.data)
      }catch(err){
         setError(err)
         console.log(err);
      }finally{
         setLoading(false)
      }
   }

   useEffect(() => {
      fetchData()
   },[])

   return (
      <>
         {loading && <p>Loading...</p>}
         {error && <h2>{error?.code}</h2>}
         {data &&
            <div>
               {data.map((event) => {
                  return(
                     <div className={styles.card} key={event.id}>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>

                        <h4>Who's going</h4>
                        <ul>
                           {event.attendies.map((user) => {
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
