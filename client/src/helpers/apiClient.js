import axios from 'axios'

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

   }
   
   console.log(err)
   
 });

export default apiClient