
import { useForm } from "react-hook-form";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Key from '@mui/icons-material/Key';
import CheckFormControl from '@/components/helpers/CheckFormControl';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import styles from './page.module.css';
import handleSignUp from './helpers/handelSignUp.js'
import CheckPasswords from "./helpers/CheckPasswords";

const SignUp = () => {
  const [credentials, setCredentials] = useState({email:'', password:'', confirmPassword:''});
  const { register, formState: { errors } } = useForm();

  const handleInput = (e) => {
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }

  return(
    <div className={styles.LoginForm}>
      {/*<Image id='logo' width={500} height={500} src="/images/hangrypanda-icon.png" alt="Hangry Panda Logo"/>*/}
      <h1>Create Account</h1>

      <Box
        component="form"
        sx={{ display:'flex', flexDirection:'column',
          '& .MuiInput-root': { m:2, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <FormControl
          onChange={handleInput}
          variant="standard"
        >
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
              autoComplete="email"
              sx={{color:'white'}}
              startAdornment={
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              }/>
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
            autoComplete="current-password"
            startAdornment={
              <InputAdornment position="start">
                <Key />
              </InputAdornment>
            }/>
        </FormControl>

        <FormControl onChange={handleInput} variant="standard" >
          <InputLabel htmlFor="input-with-icon-adornment">
            Confirm password
          </InputLabel>
          <Input
              {...register("password-confirm", { required: "Confirm password"})}
              required
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              variant="standard"
              autoComplete="current-password"
              startAdornment={
              <InputAdornment position="start">
                <Key />
              </InputAdornment>
            }/>
          <CheckPasswords
            password1={credentials.password}
            password2={credentials.confirmPassword}
            errors={errors}/>
        </FormControl>
      </Box>
      
      <Button id="submit" variant="outlined" size="medium" onClick={() => handleSignUp(credentials)}>Submit</Button>
    </div>
  )
}

export default SignUp;
