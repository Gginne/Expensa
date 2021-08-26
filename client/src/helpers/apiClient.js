import axios from 'axios'
import { Redirect } from 'react-router';

const apiClient = axios.create();

apiClient.interceptors.request.use((req) => {
   const token = localStorage.getItem('token');
   //console.log(token)
   req.headers = {  
    'x-auth-token': token
  }
  return req
  }, (err) => {
     console.log(err)
});

apiClient.interceptors.response.use((res) => {
   
   return res;
 }, (err) => {
   
   if(err.response.status === 400){
      const {data, config} = err.response
      localStorage.setItem('token', data.token)
      console.log("refreshed")

      return apiClient(config)

   } else if(err.response.status === 401){
      const {auth} = err.response
      if(!auth) return <Redirect to="/logout" />
   }
   
   console.log(err)
   
 });

export default apiClient