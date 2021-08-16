import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies()
const apiClient = axios.create();

apiClient.interceptors.request.use(async (config) => {
   const token = cookies.get('token')
   config.headers = {  
    'x-auth-token': token
  }

  }, (err) => {
     console.log("error in getting ",err)
});

export default apiClient