import axios from 'axios'
import { Redirect } from 'react-router';

const apiClient = axios.create();

apiClient.interceptors.request.use((req) => {
   const token = localStorage.getItem('token');
   console.log(token)
   
   req.headers = {  
    'x-auth-token': token
  }
  console.log(req)
  return req
  }, (err) => {
   console.log(err)
   Promise.reject(err)
});

apiClient.interceptors.response.use((res) => {
   
   return res;
 }, async (err) => {
   
   if(err.response.status === 401){

      try{
         const {data} = await axios.get("/api/refresh")
         localStorage.setItem('token', data.token)
         console.log(err.response.config.data)
         err.response.config.data = JSON.parse(err.response.config.data)
         console.log(err.response.config.data)
         return apiClient(err.response.config)
      }catch(e){
         console.log(e)
      }
      
   } 
   
   console.log(err)
   Promise.reject(err)
   return <Redirect to="/logout" />
 });

export default apiClient