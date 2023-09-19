import Layout from "@/components/layout";
import styles from './dashboard.module.css'
import { useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Organizing from "@/components/Events/Organizing.js";
import Attending from '@/components/Events/Attending.js';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Login from "../login";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const Dashboard = () => {
   const [currentUser, setCurrentUser] = useState(null);
   const [loading, setLoading] = useState(false);
   const [tabValue, setTabValue] = useState(0);

   const getUserInfo = async( email ) => {
      const URL = '/api/users/profile'
      try {
         setLoading(true);
         const response = await axios.post(`${URL}`, {
            email: email
         })
         console.log(response.data.id);
         setCurrentUser(response.data);
         setLoading(false)
      } catch (err) { console.log(err) }
   }

   const tabProps = (index) => {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }

   const handleChange = (event, newValue) => {
      setTabValue(newValue);
   }

   const TabPanel = ( { children, value, index } ) => {
      console.log(index)

      TabPanel.propTypes = {
         children: PropTypes.node,
         index: PropTypes.number.isRequired,
         value: PropTypes.number.isRequired,
       };

      return (
         <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            >
               { value === index && ( children ) }
         </div>
      )
    }

   useEffect(() => {

      const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECTID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSENGERID,
      appId: process.env.NEXT_PUBLIC_APPID,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
      };
      const app = initializeApp(firebaseConfig);
      //Attatch Firebase authentication Observer
      const auth = getAuth(app)
      onAuthStateChanged(auth, (user) => {
         if (user) {
            getUserInfo(user.email)
            setCurrentUser(user)
            console.log(currentUser);
         } else {  
            setCurrentUser(null)
            console.log("logged out!"); 
         }
      })
   },[])

   return (
      <Layout>
         {currentUser &&
            <div className = {styles.dashboard}>
               <div className= {styles.window}>  
                  <Box sx={{ width: '100%' }}>
                     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>               
                        <Tabs
                           value={tabValue} 
                           onChange={handleChange}
                           aria-label="basic tabs example">                    
                              <Tab label="Organizing" {...tabProps(0)} />
                              <Tab label="Attending" {...tabProps(1)} /> 
                        </Tabs>
                     </Box>
                     <TabPanel
                        value={tabValue}
                        index={0}>
                        <Organizing
                           user={currentUser}/>
                     </TabPanel>
                     <TabPanel
                        value={tabValue}
                        index={1}>
                        <Attending
                           user={currentUser}/>
                     </TabPanel>   
                  </Box>               
               </div>              
            </div>}
      </Layout>
   )
}

export default Dashboard;
