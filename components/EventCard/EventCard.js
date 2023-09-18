import styles from './eventcard.module.css'
import ActionBar from '../ActionBar/ActionBar';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { parseISO, format } from 'date-fns';
import { af } from 'date-fns/locale';

const EventCard = ( { title, description, start, end, attendies }) => {

   const [showAttendies, setShowAttendies] = useState(false);
   const [expanded, setExpanded] = useState(false);
   // return(
   //    <div className={styles.card}>
   //       <ActionBar/>
   //       <div className={styles.content}>
   //          <div className={styles.datetime}>
   //             <h3>{title}</h3>
   //             <h4>{start}</h4>
   //             <h4>{end}</h4>
   //          </div>           
   //          <p>{description}</p>
   //          <div>
   //             <h4 onClick={() => showAttendies? setShowAttendies(false):setShowAttendies(true)}>Who is going?</h4>
   //                {showAttendies &&               
   //                   <ul>
   //                      {attendies.map((user) => {
   //                         return(
   //                            <li key={user.id}>{user.email}</li>
   //                         )
   //                      })}
   //                   </ul>
   //                }
   //          </div>              
   //       </div>
   //    </div>
   // )
   const ExpandMore = styled((props) => {
      const { expand, ...other } = props;
      return <IconButton {...other} />;
   })(({ theme, expand }) => ({
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
   }));

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   const beautifyDate = (iso) => {
      const date = parseISO(iso);
      console.log(date);
      const pretty= format(date, "EEEE, M/d")
      console.log(pretty);
      return pretty;
   }

   const beautifyTime = (iso) => {
      const time = parseISO(iso);
      const pretty = format(time, "K:mm a")
      return pretty;
   }

   return (
      <div className={styles.card}>
         <Card>
            <CardHeader
               action={
                  <IconButton aria-label="settings">
                     <MoreHorizIcon />
                  </IconButton>
               }
               title={`${title} - ${beautifyDate(start)}`}
               subheader={`${beautifyTime(start)} - ${beautifyTime(end)}`}>
            </CardHeader>
            <CardContent> 
               {description}
            </CardContent>
            <CardActions>
               <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
               >  
                  Guests
                  <ExpandMoreIcon />
               </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
               <CardContent>
                  <ul>
                     {attendies?.map((user) => {
                        return (
                           <li key={user.id}>{user.email}</li>
                        )
                     })}
                  </ul>
               </CardContent>
            </Collapse>
         </Card>
      </div>     
   )
}

export default EventCard;