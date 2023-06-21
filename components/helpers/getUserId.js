import axios from "axios";

const getUserId = async( email ) => {
   const URL = '/api/users/profile'
   try {
      const response = await axios.post(`${URL}`, {
         email: email
      })
      .then((response) => {
         console.log(response.data)
         return response.data
      })
   } catch (err) { console.log(err) } 
   
}
export default getUserId;