import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from 'react'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import styles from './login.module.css'
import CheckFormControl from "@/components/helpers/CheckFormControl";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from 'next/link'
import translateError from "@/components/helpers/TranslateError";
import Router from 'next/router'

const Login = () => {
   
   const { register, handleSubmit, formState: { errors }, watch } = useForm( {mode: "onChange"})
   const [credentials, setCredentials] = useState({email:'', password:''})
   const [credentialsError, setCredentialsError] = useState('')
   const [loading, setLoading] = useState (false)
   const [currentUser, setCurrentUser] = useState(null)

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

   const login = async () => {
      checkCredentials(credentials.email, credentials.password)
   }

   const handleInput = (e) => {
      setCredentials({...credentials,[e.target.name]:e.target.value})
   }

   const checkCredentials = async (email, password) => {
      setLoading(true)
      const auth = getAuth(app)
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            //success
            console.log('logged in!');
            setCredentialsError('');
            setCurrentUser(auth.currentUser)
            Router.push('/')
         })
         .catch((error) => {
            console.log(error.message);
            setCredentialsError(error.message)
         })
         .finally(() => {
            setLoading(false)
         })
   }

   return (
      <div className={styles.LoginForm}>

         <h1>Event Manager</h1>
         <h3>Sign In</h3>
         <Box
            component="form"
            sx={{ display:'flex', flexDirection:'column',
            '& .MuiInput-root': { m:2, width: '27ch' },
            }}
            autoComplete="off">
            <FormControl onChange={handleInput} variant="standard">
               <InputLabel htmlFor="input-with-icon-adornment">
                  Email
               </InputLabel>
               <Input
                  {...register("email", { required: "Email is required",
                  pattern: {
                   value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                   message: "Must be a valid email address."
                  }})}
                  type="email"
                  name="email"
                  id="standard-required"
                  variant="standard"
                  autoComplete="email"/>
               <CheckFormControl
                  errors={errors}/>
            </FormControl>

            <FormControl onChange={handleInput} variant="standard">
               <InputLabel htmlFor="input-with-icon-adornment">
                 Password
               </InputLabel>
               <Input
                  {...register("password", { required: "Enter password"})}
                  required
                  id="standard-password-input"
                  name="password"
                  type="password"
                  variant="standard"
                  autoComplete="current-password"/>
            </FormControl>

            { loading ?
               <p>Logging in...</p>
            :
               credentialsError && <p className={styles.error}>{translateError(credentialsError)}</p>
            }
         </Box>

         <Button id="submit" variant="outlined" size="large" onClick={login}>Sign in</Button>

         <div className = {styles.signupCTA}>
            <p>Dont have an account?</p>
            <Link href="/signup"><Button>Register</Button></Link>
         </div>
      </div>
   )
}

export default Login;
