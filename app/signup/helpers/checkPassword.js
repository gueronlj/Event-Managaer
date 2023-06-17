const checkPassword = ( passWord1, passWord2 ) => {
   if ( passWord1 !== passWord2 ) {
      return false
   } else {
      return true
   }
}

export default checkPassword;