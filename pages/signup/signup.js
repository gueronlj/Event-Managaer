import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react'

const Signup = () => {
  const [credentials, setCredentials] = useState({email:'gueronlj4@gmail.com', password:'123456'})
 
  const handleSignUp = () => {

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
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        //TODO: Add new user to prisma database
       })
      .catch((error) => {
        console.log(error.message)
        if ( error.message === "Firebase: Error (auth/email-already-in-use)." ){
          console.log('Email already in use')
        } else {
          console.log("something wrong")
        }
      });
  }

  return(
    <div>
      <button onClick={handleSignUp}>Create Account</button>
    </div>
  )

}

export default Signup;