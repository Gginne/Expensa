import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies()
const apiClient = axios.create();

apiClient.interceptors.request.use(async (config) => {
   const token = cookies.get('token')
   console.log(token)
   config.headers = {  
    'x-auth-token': token
  }
  return config
  }, (err) => {
     console.log("error in getting ",err)
});

export default apiClient