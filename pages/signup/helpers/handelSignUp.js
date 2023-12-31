import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import checkPassword from './checkPassword';
import useRouter from 'next/navigation';
import Router from 'next/router';

const addUsertoDB = async ( email )=> {
  try {
    const body = { 
      email: email,
      name: 'Joe Shmoe',
      phone:'',
    }
    await fetch(`/api/users/newUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })  
  } catch (error) {
    console.error(error)
  }
}

const handleSignUp = async ( {email, password, confirmPassword} ) => {

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

    if (checkPassword(password, confirmPassword)){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        addUsertoDB(email);
      })
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((user) => {
            //success
            console.log('logged in!');
            // const router = useRouter()
            Router.push('/')
          })
          .catch((error) => {
            console.log(error.message);
          })
      })      
      .catch((error) => {
        console.log(error.message);
      });
    }
}

export default handleSignUp;