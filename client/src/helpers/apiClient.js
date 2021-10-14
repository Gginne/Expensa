import axios from 'axios'
import {history} from "./utils"

const apiClient = axios.create();

apiClient.interceptors.request.use((req) => {
   const token = localStorage.getItem('token');
   
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
   console.log(err.response)
   if(err.response.status === 401){

      try{
         const refresh = await axios.get("/api/refresh")
         localStorage.setItem('token', refresh.data.token)
         
         console.log("refreshing...")
         err.response.config.data = JSON.parse(err.response.config.data)
      
         return apiClient(err.response.config)
      }catch(e){
         console.log(e)
      }
      
   } 
   
   console.log(err)
   console.log(err.response)
   Promise.reject(err)

   history.push("/logout")
   window.location.reload(false)
 });

export default apiClient