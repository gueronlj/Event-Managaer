import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from 'react'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import CheckFormControl from '../helpers/CheckFormControl.js'
import styles from './login.module.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import translateError from '../helpers/TranslateError.js'
import Link from 'next/link'

const Login = ({setCurrentUser}) => {
   
   const { register, handleSubmit, formState: { errors }, watch } = useForm( {mode: "onChange"})
   const [credentials, setCredentials] = useState({email:'', password:''})
   const [credentialsError, setCredentialsError] = useState('')
   const [loading, setLoading] = useState (false)

   const login = async () => {
      console.log(credentials);
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
            setCredentialsError('')
            setCurrentUser(auth.currentUser)
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
