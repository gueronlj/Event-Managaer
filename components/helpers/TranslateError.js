const translateError = ( string ) => {
   switch (string){
      case 'Firebase: Error (auth/user-not-found).':
         return 'No account with that e-mail was found.'
      case 'Firebase: Error (auth/wrong-password).':
         return 'Incorrect password.'
      case 'Firebase: Error (auth/missing-password).':
         return 'Password required'
      case 'Firebase: Error (auth/invalid-email).':
         return 'Invalid e-mail address'
   }
}

export default translateError;
