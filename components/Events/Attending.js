import styles from './styles.module.css';
import ActionBar from '../ActionBar/ActionBar';
import EventCard from '../EventCard/EventCard';

const Attending = ( { user } ) => {

   return (
      <div>
         {user.Event.map((event) => {
            return(
               <EventCard
                  key={event.id}
                  title={event.title}
                  description={event.description}
                  start={event.start}
                  end={event.end}/>
            )
         })}
      </div>
   )
}

export default Attending;
