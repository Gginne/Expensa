import axios from 'axios'
import { Redirect } from 'react-router';

const apiClient = axios.create();

apiClient.interceptors.request.use((req) => {
   const token = localStorage.getItem('token');
   //console.log(token)
   console.log(token)
   req.headers = {  
    'x-auth-token': token
  }
  return req
  }, (err) => {
   console.log(err)
   Promise.reject(err)
});

apiClient.interceptors.response.use((res) => {
   
   return res;
 }, async (err) => {
   
   if(err.response.status === 401){
      const {data, config} = err.response
      const refresh = await axios.get("/api/refresh")
      console.log(refresh)

   } 
   
   console.log(err)
   Promise.reject(err)
   return <Redirect to="/logout" />
   
 });

export default apiClient