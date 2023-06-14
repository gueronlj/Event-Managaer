import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from 'react'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import FormControl from "@mui/material/FormControl";
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";

const Login = () => {

   const { register, handleSubmit, formState: { errors } } = useForm()
   const [credentials, setCredentials] = useState({email:'', password:''})

    const onSubmit = (data) => {
      console.log(data);
    }

    const handleInput = (e) => {
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }  

    return (
      <Box
         component="form"
         sx={{ display:'flex', flexDirection:'column',
         '& .MuiInput-root': { m:2, width: '30ch' },
        }}
         noValidate
         autoComplete="off"
      >
         <FormControl
              onChange={handleInput}
              variant="standard">
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
                 startAdornment={
                  <InputAdornment position="start">
                  </InputAdornment>
                }/>
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
                  </InputAdornment>
                }/>
            </FormControl>
            <Button id="submit" type="submit" variant="outlined" size="large" onClick={handleSubmit(onSubmit)}>Submit</Button>
      </Box>    
    )
}

export default Login;